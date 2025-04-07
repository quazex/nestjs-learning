import { Inject } from '@nestjs/common';
import { KafkaProducerToken } from './producer.tokens';

/**
 * Inject Producer instance from `kafkajs`.
 * Useful to manage connection.
 * @link https://kafka.js.org/docs/producing#producing-messages
 */
export const InjectKafkaProducer = (): ReturnType<typeof Inject> => (
    Inject(KafkaProducerToken.producer)
);

/**
 * Inject Producer instance from `kafkajs`.
 * Useful to manage or describing cluster.
 * @link https://kafka.js.org/docs/admin
 */
export const InjectKafkaAdmin = (): ReturnType<typeof Inject> => (
    Inject(KafkaProducerToken.admin)
);
