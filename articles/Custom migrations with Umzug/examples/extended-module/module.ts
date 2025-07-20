import { Module } from '@nestjs/common';
import { KnexModule } from '@quazex/nestjs-knex';
import { UmzugPostgresModule } from '../../source';
import { ExampleExtendedConfig } from './config';
import { ExampleMigrationModule } from './migration/migration.module';

@Module({
    imports: [
        UmzugPostgresModule.forRoot({
            connection: {
                connectionString: ExampleExtendedConfig.url,
                statement_timeout: ExampleExtendedConfig.timeout,
                query_timeout: ExampleExtendedConfig.timeout,
                lock_timeout: ExampleExtendedConfig.timeout,
                idle_in_transaction_session_timeout: ExampleExtendedConfig.timeout,
                connectionTimeoutMillis: ExampleExtendedConfig.timeout,
            },
            generating: {
                path: 'examples/extended-module',
            },
        }),
        KnexModule.forRoot({
            client: 'pg',
            connection: {
                connectionString: ExampleExtendedConfig.url,
                statement_timeout: ExampleExtendedConfig.timeout,
                query_timeout: ExampleExtendedConfig.timeout,
                idle_in_transaction_session_timeout: ExampleExtendedConfig.timeout,
                connectionTimeoutMillis: ExampleExtendedConfig.timeout,
            },
        }),
        ExampleMigrationModule,
    ],
})
export class ExampleExtendedModule {}
