import { Inject } from '@nestjs/common';
import { KafkaConsumerToken } from './consumer.tokens';

/**
 * Inject Consumer instance from `kafkajs`.
 * Useful to manage connection.
 * @link https://kafka.js.org/docs/consuming
 */
export const InjectKafkaConsumerConsumer = (): ReturnType<typeof Inject> => (
    Inject(KafkaConsumerToken.consumer)
);

/**
 * Inject Producer instance from `kafkajs`.
 * Useful to manage or describing cluster.
 * @link https://kafka.js.org/docs/admin
 */
export const InjectKafkaConsumerAdmin = (): ReturnType<typeof Inject> => (
    Inject(KafkaConsumerToken.admin)
);
