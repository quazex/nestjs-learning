import { ParseArrayPipe, Type } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

/**
 * Wrapper around Payload decorator from `@nestjs/microservices`.
 * We always consume array of messages,
 * so custom decorator helps to reuse common logic of validation.
 */
export const KafkaPayload = (type: Type): ParameterDecorator => {
    const pipe = new ParseArrayPipe({ items: type });
    return Payload(pipe);
};
