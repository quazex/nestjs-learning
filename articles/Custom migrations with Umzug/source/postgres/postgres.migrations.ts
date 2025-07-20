import { MigrationMeta, Umzug } from 'umzug';
import { MigrationsDiscovery } from '../migrations/migrations.discovery';
import { MigrationsLogger } from '../migrations/migrations.logger';
import { MigrationsTemplate } from '../migrations/migrations.template';
import { MigrationsClient, MigrationsCreate } from '../migrations/migrations.types';
import { UmzugPostgresStorage } from './postgres.storage';
import { MigrationPostgresConfig } from './postgres.types';

export class PostgresMigration implements MigrationsClient {
    constructor(
        private readonly configuration: MigrationPostgresConfig,
        private readonly discovery: MigrationsDiscovery,
        private readonly persistence: UmzugPostgresStorage,
    ) {}

    get #instance(): Umzug {
        return new Umzug({
            migrations: this.discovery.explore(),
            logger: new MigrationsLogger(),
            storage: this.persistence,
            create: {
                folder: this.configuration.generating?.path,
            },
        });
    }

    public async up(): Promise<MigrationMeta[]> {
        const meta = await this.#instance.up();
        return meta;
    }

    public async down(): Promise<MigrationMeta[]> {
        const meta = await this.#instance.down();
        return meta;
    }

    public async create(params?: MigrationsCreate): Promise<void> {
        const filename = params?.filename ?? 'migration';
        const timestamp = Date.now();

        const content = await MigrationsTemplate.generate(timestamp);

        await this.#instance.create({
            name: `${timestamp}.${filename}.ts`,
            prefix: 'NONE',
            allowExtension: '.ts',
            allowConfusingOrdering: false,
            skipVerify: true,
            content,
        });
    }
}
