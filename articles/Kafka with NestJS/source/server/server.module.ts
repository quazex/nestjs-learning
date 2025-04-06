import { DynamicModule } from '@nestjs/common';
import { KafkaServerIndicator } from './server.indicator';
import { KafkaServerAsyncConfig } from './server.interfaces';
import { KafkaServerProviders } from './server.providers';
import { KafkaServerStrategy } from './server.strategy';
import { KafkaServerConfig } from './server.types';

export class KafkaServerModule {
    public static forRoot(options: KafkaServerConfig): DynamicModule {
        const KafkaServerConfigProvider = KafkaServerProviders.getConfig(options);
        const KafkaServerClientProvider = KafkaServerProviders.getClient();
        const KafkaServerConsumerProvider = KafkaServerProviders.getConsumer();
        const KafkaServerAdminProvider = KafkaServerProviders.getAdmin();

        const dynamicModule: DynamicModule = {
            module: KafkaServerModule,
            global: true,
            providers: [
                KafkaServerConfigProvider,
                KafkaServerClientProvider,
                KafkaServerConsumerProvider,
                KafkaServerAdminProvider,
                KafkaServerStrategy,
                KafkaServerIndicator,
            ],
            exports: [
                KafkaServerClientProvider,
                KafkaServerConsumerProvider,
                KafkaServerAdminProvider,
                KafkaServerStrategy,
                KafkaServerIndicator,
            ],
        };

        return dynamicModule;
    }

    public static forRootAsync(asyncConfig: KafkaServerAsyncConfig): DynamicModule {
        const KafkaServerConfigProvider = KafkaServerProviders.getAsyncConfig(asyncConfig);
        const KafkaServerClientProvider = KafkaServerProviders.getClient();
        const KafkaServerConsumerProvider = KafkaServerProviders.getConsumer();
        const KafkaServerAdminProvider = KafkaServerProviders.getAdmin();

        const dynamicModule: DynamicModule = {
            module: KafkaServerModule,
            global: true,
            providers: [
                KafkaServerConfigProvider,
                KafkaServerClientProvider,
                KafkaServerConsumerProvider,
                KafkaServerAdminProvider,
                KafkaServerStrategy,
                KafkaServerIndicator,
            ],
            exports: [
                KafkaServerClientProvider,
                KafkaServerConsumerProvider,
                KafkaServerAdminProvider,
                KafkaServerStrategy,
                KafkaServerIndicator,
            ],
        };

        return dynamicModule;
    }
}
