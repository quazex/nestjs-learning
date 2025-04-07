import { Injectable } from '@nestjs/common';
import { Message, Producer } from 'kafkajs';
import { KafkaPayload } from '../shared/kafka.payload';
import { InjectKafkaProducer } from './producer.decorators';
import { KafkaProducerMessage } from './producer.types';

@Injectable()
export class KafkaProducerClient {
    private readonly payload = new KafkaPayload();

    constructor(
        @InjectKafkaProducer() private readonly producer: Producer,
    ) {}

    /**
     * Send data to specific Kafka topic.
     * Allows to send multiple messages by one call.
     */
    public async send<TData>(message: KafkaProducerMessage<TData>): Promise<void> {
        const payload = message.payload.map<Message>((payload) => ({
            value: this.payload.encode(payload),
        }));

        await this.producer.send({
            topic: message.topic,
            messages: payload,
        });
    }
}
