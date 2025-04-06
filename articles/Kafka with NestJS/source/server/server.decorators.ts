import { Inject } from '@nestjs/common';
import { KafkaServerToken } from './server.tokens';

export const InjectKafkaServerClient = (): ReturnType<typeof Inject> => (
    Inject(KafkaServerToken.client)
);

export const InjectKafkaServerConsumer = (): ReturnType<typeof Inject> => (
    Inject(KafkaServerToken.consumer)
);

export const InjectKafkaServerAdmin = (): ReturnType<typeof Inject> => (
    Inject(KafkaServerToken.admin)
);
