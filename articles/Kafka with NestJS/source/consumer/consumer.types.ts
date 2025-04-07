import { AdminConfig, Batch, ConsumerConfig, KafkaConfig } from 'kafkajs';

export type KafkaConsumerContextArgs<TData = unknown> = [TData[], Batch];

export interface KafkaConsumerConfig {
    connection: KafkaConfig;
    consumer: ConsumerConfig;
    admin?: AdminConfig;

    /**
     * @default false
     */
    fromBeginning?: boolean;

    /**
     * @default 1
     */
    concurrency?: number;
}

export interface KafkaConsumerHealth {
    isHealthy: boolean;
    status: string;
}
