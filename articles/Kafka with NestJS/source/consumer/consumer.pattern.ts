import { applyDecorators } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KafkaConsumerTransport } from './consumer.transport';

export const KafkaPattern = (topic: string): MethodDecorator => {
    const decorator = EventPattern(topic, KafkaConsumerTransport);
    return applyDecorators(decorator);
};
