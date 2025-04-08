import { Injectable } from '@nestjs/common';
import { Message, Producer } from 'kafkajs';
import { KafkaConverter } from '../shared/kafka.converter';
import { InjectKafkaProducer } from './producer.decorators';
import { KafkaProducerMessage } from './producer.types';

@Injectable()
export class KafkaProducerClient {
    private readonly converter = new KafkaConverter();

    constructor(
        @InjectKafkaProducer() private readonly producer: Producer,
    ) {}

    /**
     * Send data to specific Kafka topic.
     * Allows to send multiple messages by one call.
     */
    public async send<TData>(message: KafkaProducerMessage<TData>): Promise<void> {
        const payload = message.payload.map<Message>((payload) => ({
            value: this.converter.encode(payload),
        }));

        await this.producer.send({
            topic: message.topic,
            messages: payload,
        });
    }
}
