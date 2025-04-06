import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common';
import { KafkaServerConfig } from './server.types';

export interface KafkaServerConfigFactory {
    createKafkaServerConfig(): Promise<KafkaServerConfig> | KafkaServerConfig;
}

export interface KafkaServerAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useExisting?: Type<KafkaServerConfigFactory>;
    useFactory?: (...args: any[]) => Promise<KafkaServerConfig> | KafkaServerConfig;
}
