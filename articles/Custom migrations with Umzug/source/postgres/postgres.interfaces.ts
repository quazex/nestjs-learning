import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common';
import { MigrationPostgresConfig } from './postgres.types';

export interface MigrationPostgresSync extends MigrationPostgresConfig {
    /**
     * Module scope
     */
    isGlobal?: boolean;
}

export interface MigrationPostgresFactory {
    createUmzugPostgres(): Promise<MigrationPostgresConfig> | MigrationPostgresConfig;
}

export interface MigrationPostgresAsync extends Pick<ModuleMetadata, 'imports'> {
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useExisting?: Type<MigrationPostgresFactory>;
    useFactory?: (...args: any[]) => Promise<MigrationPostgresConfig> | MigrationPostgresConfig;
    isGlobal?: boolean;
}
