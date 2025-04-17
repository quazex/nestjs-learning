import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common';
import { KafkaConsumerConfig } from './consumer.types';

export interface KafkaConsumerConfigFactory {
    createKafkaConsumerConfig(): Promise<KafkaConsumerConfig> | KafkaConsumerConfig;
}

export interface KafkaConsumerAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useExisting?: Type<KafkaConsumerConfigFactory>;
    useFactory?: (...args: any[]) => Promise<KafkaConsumerConfig> | KafkaConsumerConfig;
}
