import { applyDecorators } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KafkaServerTransport } from './server.transport';

export const KafkaPattern = (topic: string): MethodDecorator => {
    const decorator = EventPattern(topic, KafkaServerTransport);
    return applyDecorators(decorator);
};
