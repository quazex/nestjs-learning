import { Inject, Injectable, Logger } from '@nestjs/common';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { NO_EVENT_HANDLER } from '@nestjs/microservices/constants';
import { Consumer, EachBatchPayload } from 'kafkajs';
import { isObservable, lastValueFrom } from 'rxjs';
import { KafkaConverter } from '../shared/kafka.converter';
import { KafkaConsumerContext } from './consumer.context';
import { KafkaConsumerToken } from './consumer.tokens';
import { KafkaConsumerTransport } from './consumer.transport';
import { KafkaConsumerConfig } from './consumer.types';

@Injectable()
export class KafkaConsumerStrategy extends Server implements CustomTransportStrategy {
    public readonly logger = new Logger(KafkaConsumerStrategy.name);
    public readonly transportId = KafkaConsumerTransport;

    private readonly converter = new KafkaConverter();

    constructor(
        @Inject(KafkaConsumerToken.config) private readonly config: KafkaConsumerConfig,
        @Inject(KafkaConsumerToken.consumer) private readonly consumer: Consumer,
    ) {
        super();
    }


    private async consume(payload: EachBatchPayload): Promise<void> {
        const handler = this.getHandlerByPattern(payload.batch.topic);
        if (!handler?.isEventHandler) {
            this.logger.warn(NO_EVENT_HANDLER`${payload.batch.topic}`);
            return;
        }

        const messages = payload.batch.messages.map((msg) => this.converter.parse(msg.value));
        const latest = payload.batch.lastOffset();

        const context = new KafkaConsumerContext([
            messages,
            payload.batch,
        ]);

        const result = await handler(messages, context);

        const isStream = isObservable(result);
        if (isStream) {
            await lastValueFrom(result);
        }

        payload.resolveOffset(latest);

        try {
            await payload.heartbeat();
            await payload.commitOffsetsIfNecessary();
        }
        catch (error) {
            this.logger.error(error);
        }
    }


    public async listen(callback: (...params: unknown[]) => void): Promise<void> {
        const patterns = this.getHandlers().keys();
        const topics = Array.from(patterns);

        if (topics.length > 0) {
            await this.consumer.connect();

            await this.consumer.subscribe({
                topics,
                fromBeginning: this.config.fromBeginning ?? false,
            });

            await this.consumer.run({
                autoCommit: true,
                eachBatchAutoResolve: true,
                partitionsConsumedConcurrently: this.config.concurrency ?? 1,
                eachBatch: this.consume.bind(this),
            });
        }

        callback();
    }


    public async close(): Promise<void> {
        await this.consumer.stop();
        await this.consumer.disconnect();
        this.logger.log('Consumer stopped and disconnected');
    }
}
