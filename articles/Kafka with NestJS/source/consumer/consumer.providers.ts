import { FactoryProvider, Provider, ValueProvider } from '@nestjs/common';
import { Admin, Consumer, Kafka } from 'kafkajs';
import { KafkaLogger } from '../shared/kafka.logger';
import { KafkaConsumerAsyncConfig, KafkaConsumerConfigFactory } from './consumer.interfaces';
import { KafkaConsumerToken } from './consumer.tokens';
import { KafkaConsumerConfig } from './consumer.types';

export class KafkaConsumerProviders {
    public static getConfig(options: KafkaConsumerConfig): ValueProvider<KafkaConsumerConfig> {
        return {
            provide: KafkaConsumerToken.config,
            useValue: options,
        };
    }

    public static getAsyncConfig(options: KafkaConsumerAsyncConfig): Provider<KafkaConsumerConfig> {
        if (options.useFactory) {
            return {
                provide: KafkaConsumerToken.config,
                useFactory: options.useFactory,
                inject: options.inject,
            };
        }
        if (options.useExisting) {
            return {
                provide: KafkaConsumerToken.config,
                useFactory: async(factory: KafkaConsumerConfigFactory): Promise<KafkaConsumerConfig> => {
                    const config = await factory.createKafkaConsumerConfig();
                    return config;
                },
                inject: [options.useExisting],
            };
        }
        throw new Error('Must provide useFactory or useClass');
    }

    public static getClient(): FactoryProvider<Kafka> {
        return {
            provide: KafkaConsumerToken.client,
            useFactory: (config: KafkaConsumerConfig) => new Kafka({
                logCreator: KafkaLogger.init.bind(KafkaLogger),
                ...config.connection,
            }),
            inject: [
                KafkaConsumerToken.config,
            ],
        };
    }

    public static getConsumer(): FactoryProvider<Consumer> {
        return {
            provide: KafkaConsumerToken.consumer,
            useFactory: (config: KafkaConsumerConfig, kafka: Kafka) => kafka.consumer(config.consumer),
            inject: [
                KafkaConsumerToken.config,
                KafkaConsumerToken.client,
            ],
        };
    }

    public static getAdmin(): FactoryProvider<Admin> {
        return {
            provide: KafkaConsumerToken.admin,
            useFactory: (config: KafkaConsumerConfig, kafka: Kafka) => kafka.admin(config.admin),
            inject: [
                KafkaConsumerToken.config,
                KafkaConsumerToken.client,
            ],
        };
    }
}
