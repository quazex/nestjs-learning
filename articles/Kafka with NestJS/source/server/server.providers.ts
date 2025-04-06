import { FactoryProvider, Provider, ValueProvider } from '@nestjs/common';
import { Admin, Consumer, Kafka } from 'kafkajs';
import { KafkaLogger } from '../shared/kafka.logger';
import { KafkaServerAsyncConfig, KafkaServerConfigFactory } from './server.interfaces';
import { KafkaServerToken } from './server.tokens';
import { KafkaServerConfig } from './server.types';

export class KafkaServerProviders {
    public static getConfig(options: KafkaServerConfig): ValueProvider<KafkaServerConfig> {
        return {
            provide: KafkaServerToken.config,
            useValue: options,
        };
    }

    public static getAsyncConfig(options: KafkaServerAsyncConfig): Provider<KafkaServerConfig> {
        if (options.useFactory) {
            return {
                provide: KafkaServerToken.config,
                useFactory: options.useFactory,
                inject: options.inject,
            };
        }
        if (options.useExisting) {
            return {
                provide: KafkaServerToken.config,
                useFactory: async(factory: KafkaServerConfigFactory): Promise<KafkaServerConfig> => {
                    const config = await factory.createKafkaServerConfig();
                    return config;
                },
                inject: [options.useExisting],
            };
        }
        throw new Error('Must provide useFactory or useClass');
    }

    public static getClient(): FactoryProvider<Kafka> {
        return {
            provide: KafkaServerToken.client,
            useFactory: (config: KafkaServerConfig) => new Kafka({
                logCreator: KafkaLogger.init.bind(KafkaLogger),
                ...config.connection,
            }),
            inject: [
                KafkaServerToken.config,
            ],
        };
    }

    public static getConsumer(): FactoryProvider<Consumer> {
        return {
            provide: KafkaServerToken.consumer,
            useFactory: (config: KafkaServerConfig, kafka: Kafka) => kafka.consumer(config.consumer),
            inject: [
                KafkaServerToken.config,
                KafkaServerToken.client,
            ],
        };
    }

    public static getAdmin(): FactoryProvider<Admin> {
        return {
            provide: KafkaServerToken.admin,
            useFactory: (config: KafkaServerConfig, kafka: Kafka) => kafka.admin(config.admin),
            inject: [
                KafkaServerToken.config,
                KafkaServerToken.client,
            ],
        };
    }
}
