import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { MigrationsClient, UMZUG_PROVIDER_KEY, UmzugPostgresModule } from '../source';
import { TestsEntity } from './tests.entity';
import { TestsMigration } from './tests.migration';
import { TestsRepository } from './tests.repository';

export class TestingApplication {
    private _instance: TestingModule;
    private _container: StartedPostgreSqlContainer;

    public async init(): Promise<void> {
        const tContainer = new PostgreSqlContainer('postgres:16.1');
        this._container = await tContainer.withReuse().start();

        const timeout = 10_000;
        const config = {
            connectionString: this._container.getConnectionUri(),
            statement_timeout: timeout,
            query_timeout: timeout,
            lock_timeout: timeout,
            idle_in_transaction_session_timeout: timeout,
            connectionTimeoutMillis: timeout,
        };

        const tModule = Test.createTestingModule({
            imports: [
                UmzugPostgresModule.forRoot({
                    connection: config,
                }),
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    url: this._container.getConnectionUri(),
                    connectTimeoutMS: timeout,
                    entities: [
                        TestsEntity,
                    ],
                    synchronize: false,
                }),
                TypeOrmModule.forFeature([
                    TestsEntity,
                ]),
            ],
            providers: [
                TestsMigration,
                TestsRepository,
            ],
        });

        this._instance = await tModule.compile();
        this._instance = await this._instance.init();

        this._instance.enableShutdownHooks();
    }

    public async close(): Promise<void> {
        await this._instance?.close();
        await this._container?.stop();
    }

    public get repository(): TestsRepository {
        return this._instance.get(TestsRepository);
    }

    public get umzug(): MigrationsClient {
        return this._instance.get<MigrationsClient>(UMZUG_PROVIDER_KEY);
    }
}
