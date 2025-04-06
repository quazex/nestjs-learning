import { AdminConfig, Batch, ConsumerConfig, KafkaConfig } from 'kafkajs';

export type KafkaServerContextArgs<TData = unknown> = [TData[], Batch];

export interface KafkaServerConfig {
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

export interface KafkaServerHealth {
    isHealthy: boolean;
    status: string;
}
