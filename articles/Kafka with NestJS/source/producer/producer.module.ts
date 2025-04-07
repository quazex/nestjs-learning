import { DynamicModule, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { Admin, Producer } from 'kafkajs';
import { KafkaProducerClient } from './producer.client';
import { InjectKafkaAdmin, InjectKafkaProducer } from './producer.decorators';
import { KafkaProducerIndicator } from './producer.indicator';
import { KafkaProducerAsyncConfig } from './producer.interfaces';
import { KafkaProducerProviders } from './producer.providers';
import { KafkaProducerConfig } from './producer.types';

@Module({})
export class KafkaProducerModule implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        @InjectKafkaProducer() private readonly producer: Producer,
        @InjectKafkaAdmin() private readonly admin: Admin,
    ) {}

    public async onApplicationBootstrap(): Promise<void> {
        await this.producer.connect();
        await this.admin.connect();
    }

    public async onApplicationShutdown(): Promise<void> {
        await this.producer.disconnect();
        await this.admin.disconnect();
    }


    public static forRoot(config: KafkaProducerConfig): DynamicModule {
        const KafkaConfigProvider = KafkaProducerProviders.getConfig(config);
        const KafkaConnectionProvider = KafkaProducerProviders.getConnection();
        const KafkaProducerProvider = KafkaProducerProviders.getProducer();
        const KafkaAdminProvider = KafkaProducerProviders.getAdmin();

        const dynamicModule: DynamicModule = {
            module: KafkaProducerModule,
            providers: [
                KafkaConfigProvider,
                KafkaConnectionProvider,
                KafkaProducerProvider,
                KafkaAdminProvider,
                KafkaProducerClient,
                KafkaProducerIndicator,
            ],
            exports: [
                KafkaProducerClient,
                KafkaProducerIndicator,
            ],
        };

        return dynamicModule;
    }


    public static forRootAsync(asyncConfig: KafkaProducerAsyncConfig): DynamicModule {
        const KafkaConfigProvider = KafkaProducerProviders.getAsyncConfig(asyncConfig);
        const KafkaConnectionProvider = KafkaProducerProviders.getConnection();
        const KafkaProducerProvider = KafkaProducerProviders.getProducer();
        const KafkaAdminProvider = KafkaProducerProviders.getAdmin();

        const dynamicModule: DynamicModule = {
            module: KafkaProducerModule,
            providers: [
                KafkaConfigProvider,
                KafkaConnectionProvider,
                KafkaProducerProvider,
                KafkaAdminProvider,
                KafkaProducerClient,
                KafkaProducerIndicator,
            ],
            exports: [
                KafkaProducerClient,
                KafkaProducerIndicator,
            ],
        };

        return dynamicModule;
    }
}
