import { FactoryProvider, Provider, ValueProvider } from '@nestjs/common';
import { Admin, Kafka, Partitioners, Producer } from 'kafkajs';
import { KafkaLogger } from '../shared/kafka.logger';
import { KafkaProducerAsyncConfig, KafkaProducerConfigFactory } from './producer.interfaces';
import { KafkaProducerToken } from './producer.tokens';
import { KafkaProducerConfig } from './producer.types';

export class KafkaProducerProviders {
    public static getConfig(config: KafkaProducerConfig): ValueProvider<KafkaProducerConfig> {
        const configToken = KafkaProducerToken.config;
        return {
            provide: configToken,
            useValue: config,
        };
    }

    public static getAsyncConfig(config: KafkaProducerAsyncConfig): Provider<KafkaProducerConfig> {
        const configToken = KafkaProducerToken.config;
        if (config.useFactory) {
            return {
                provide: configToken,
                useFactory: config.useFactory,
                inject: config.inject,
            };
        }
        if (config.useExisting) {
            return {
                provide: configToken,
                useFactory: (configFactory: KafkaProducerConfigFactory) => configFactory.createKafkaProducer(),
                inject: [config.useExisting],
            };
        }
        throw new Error('Must provide useFactory or useClass');
    }

    public static getConnection(): FactoryProvider<Kafka> {
        return {
            provide: KafkaProducerToken.client,
            useFactory: (config: KafkaProducerConfig): Kafka => {
                const connection = new Kafka({
                    logCreator: KafkaLogger.init.bind(KafkaLogger),
                    ...config.connection,
                });
                return connection;
            },
            inject: [
                KafkaProducerToken.config,
            ],
        };
    }

    public static getProducer(): FactoryProvider<Producer> {
        return {
            provide: KafkaProducerToken.producer,
            useFactory: (
                config: KafkaProducerConfig,
                connection: Kafka,
            ): Producer => {
                const producer = connection.producer({
                    allowAutoTopicCreation: false,
                    createPartitioner: Partitioners.DefaultPartitioner,
                    ...config.producer,
                });
                return producer;
            },
            inject: [
                KafkaProducerToken.config,
                KafkaProducerToken.client,
            ],
        };
    }

    public static getAdmin(): FactoryProvider<Admin> {
        return {
            provide: KafkaProducerToken.admin,
            useFactory: (
                connection: Kafka,
                config: KafkaProducerConfig,
            ): Admin => {
                const admin = connection.admin(config.admin);
                return admin;
            },
            inject: [
                KafkaProducerToken.config,
                KafkaProducerToken.client,
            ],
        };
    }
}
