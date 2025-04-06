import { Inject, Injectable, Logger } from '@nestjs/common';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { NO_EVENT_HANDLER } from '@nestjs/microservices/constants';
import { Consumer, EachBatchPayload } from 'kafkajs';
import { isObservable, lastValueFrom } from 'rxjs';
import { KafkaPayload } from '../shared/kafka.payload';
import { KafkaContext } from './server.context';
import { KafkaServerToken } from './server.tokens';
import { KafkaServerTransport } from './server.transport';
import { KafkaServerConfig } from './server.types';

@Injectable()
export class KafkaServerStrategy extends Server implements CustomTransportStrategy {
    public readonly logger = new Logger(KafkaServerStrategy.name);
    public readonly transportId = KafkaServerTransport;

    private readonly payload = new KafkaPayload();

    constructor(
        @Inject(KafkaServerToken.config) private readonly config: KafkaServerConfig,
        @Inject(KafkaServerToken.consumer) private readonly consumer: Consumer,
    ) {
        super();
    }


    private async consume(payload: EachBatchPayload): Promise<void> {
        const handler = this.getHandlerByPattern(payload.batch.topic);
        if (!handler?.isEventHandler) {
            this.logger.warn(NO_EVENT_HANDLER`${payload.batch.topic}`);
            return;
        }

        const messages = payload.batch.messages.map((msg) => this.payload.parse(msg));
        const latest = payload.batch.lastOffset();

        const context = new KafkaContext([
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
