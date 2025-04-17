import { DynamicModule } from '@nestjs/common';
import { KafkaConsumerIndicator } from './consumer.indicator';
import { KafkaConsumerAsyncConfig } from './consumer.interfaces';
import { KafkaConsumerProviders } from './consumer.providers';
import { KafkaConsumerStrategy } from './consumer.strategy';
import { KafkaConsumerConfig } from './consumer.types';

export class KafkaConsumerModule {
    public static forRoot(options: KafkaConsumerConfig): DynamicModule {
        const KafkaConsumerConfigProvider = KafkaConsumerProviders.getConfig(options);
        const KafkaConsumerClientProvider = KafkaConsumerProviders.getClient();
        const KafkaConsumerConsumerProvider = KafkaConsumerProviders.getConsumer();
        const KafkaConsumerAdminProvider = KafkaConsumerProviders.getAdmin();

        const dynamicModule: DynamicModule = {
            module: KafkaConsumerModule,
            global: true,
            providers: [
                KafkaConsumerConfigProvider,
                KafkaConsumerClientProvider,
                KafkaConsumerConsumerProvider,
                KafkaConsumerAdminProvider,
                KafkaConsumerStrategy,
                KafkaConsumerIndicator,
            ],
            exports: [
                KafkaConsumerClientProvider,
                KafkaConsumerConsumerProvider,
                KafkaConsumerAdminProvider,
                KafkaConsumerStrategy,
                KafkaConsumerIndicator,
            ],
        };

        return dynamicModule;
    }

    public static forRootAsync(asyncConfig: KafkaConsumerAsyncConfig): DynamicModule {
        const KafkaConsumerConfigProvider = KafkaConsumerProviders.getAsyncConfig(asyncConfig);
        const KafkaConsumerClientProvider = KafkaConsumerProviders.getClient();
        const KafkaConsumerConsumerProvider = KafkaConsumerProviders.getConsumer();
        const KafkaConsumerAdminProvider = KafkaConsumerProviders.getAdmin();

        const dynamicModule: DynamicModule = {
            module: KafkaConsumerModule,
            global: true,
            providers: [
                KafkaConsumerConfigProvider,
                KafkaConsumerClientProvider,
                KafkaConsumerConsumerProvider,
                KafkaConsumerAdminProvider,
                KafkaConsumerStrategy,
                KafkaConsumerIndicator,
            ],
            exports: [
                KafkaConsumerClientProvider,
                KafkaConsumerConsumerProvider,
                KafkaConsumerAdminProvider,
                KafkaConsumerStrategy,
                KafkaConsumerIndicator,
            ],
        };

        return dynamicModule;
    }
}
