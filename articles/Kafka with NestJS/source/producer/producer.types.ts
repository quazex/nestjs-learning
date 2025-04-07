import { AdminConfig, KafkaConfig, ProducerConfig } from 'kafkajs';

export interface KafkaProducerConfig {
    connection: KafkaConfig;
    producer?: ProducerConfig;
    admin?: AdminConfig;
}

export interface KafkaProducerMessage<TData = unknown> {
    /**
     * Name of target topic
     */
    topic: string;

    /**
     * Array of any objects for sending
     */
    payload: TData[];
}
