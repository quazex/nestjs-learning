import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common/interfaces';
import { KafkaProducerConfig } from './producer.types';

export interface KafkaProducerConfigFactory {
    createKafkaProducer(): Promise<KafkaProducerConfig> | KafkaProducerConfig;
}

export interface KafkaProducerAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useExisting: Type<KafkaProducerConfigFactory>;
    useFactory?: (...args: any[]) => Promise<KafkaProducerConfig> | KafkaProducerConfig;
}
