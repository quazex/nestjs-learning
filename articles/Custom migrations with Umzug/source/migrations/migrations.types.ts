import { MigrationMeta } from 'umzug';

export interface MigrationsCreate {
    filename?: string;
}

export interface MigrationsClient {
    up(): Promise<MigrationMeta[]>;
    down(): Promise<MigrationMeta[]>;
    create(params?: MigrationsCreate): Promise<void>;
}
