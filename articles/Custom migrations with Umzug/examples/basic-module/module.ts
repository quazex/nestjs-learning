import { Module } from '@nestjs/common';
import { KnexModule } from '@quazex/nestjs-knex';
import { UmzugPostgresModule } from '../../source';
import { ExampleBasicConfig } from './config';
import { ExampleBasicMigration } from './migration';
import { ExampleBasicRepository } from './repository';

@Module({
    imports: [
        UmzugPostgresModule.forRoot({
            connection: {
                connectionString: ExampleBasicConfig.url,
                statement_timeout: ExampleBasicConfig.timeout,
                query_timeout: ExampleBasicConfig.timeout,
                lock_timeout: ExampleBasicConfig.timeout,
                idle_in_transaction_session_timeout: ExampleBasicConfig.timeout,
                connectionTimeoutMillis: ExampleBasicConfig.timeout,
            },
            generating: {
                path: 'examples/basic-module',
            },
        }),
        KnexModule.forRoot({
            client: 'pg',
            connection: {
                connectionString: ExampleBasicConfig.url,
                statement_timeout: ExampleBasicConfig.timeout,
                query_timeout: ExampleBasicConfig.timeout,
                idle_in_transaction_session_timeout: ExampleBasicConfig.timeout,
                connectionTimeoutMillis: ExampleBasicConfig.timeout,
            },
        }),
    ],
    providers: [
        ExampleBasicRepository,
        ExampleBasicMigration,
    ],
})
export class ExampleBasicModule {}
