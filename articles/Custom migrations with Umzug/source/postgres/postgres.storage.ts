import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';
import { UmzugStorage } from 'umzug';
import { v5 as UUIDv5 } from 'uuid';
import { StorageParams } from '../typing/storage.interfaces';
import { PostgresDefaults } from './postgres.defaults';
import { POSTGRES_CLIENT, POSTGRES_CONFIG } from './postgres.tokens';
import { MigrationPostgresConfig, PostgresDocument } from './postgres.types';

@Injectable()
export class UmzugPostgresStorage implements UmzugStorage, OnModuleInit {
    private readonly table: string;

    constructor(
        @Inject(POSTGRES_CONFIG) config: MigrationPostgresConfig,
        @Inject(POSTGRES_CLIENT) private readonly client: Client,
    ) {
        this.table = config.table ?? PostgresDefaults.table;
    }

    public async onModuleInit(): Promise<void> {
        await this.client.query(`CREATE TABLE IF NOT EXISTS ${this.table} (id UUID PRIMARY KEY, name TEXT, timestamp TIMESTAMP)`);
    }

    public async executed(): Promise<string[]> {
        const documents = await this.client.query<PostgresDocument>(`SELECT name FROM ${this.table} ORDER BY name ASC`);
        return documents.rows.map((row) => row.name);
    }

    public async logMigration(params: StorageParams): Promise<void> {
        const id = UUIDv5(params.name, UUIDv5.URL);

        await this.client.query({
            name: 'insert',
            text: `INSERT INTO ${this.table}(id, name, timestamp) VALUES($1, $2, now())`,
            values: [id, params.name],
        });
    }

    public async unlogMigration(params: StorageParams): Promise<void> {
        await this.client.query({
            name: 'delete',
            text: `DELETE FROM ${this.table} WHERE name = $1`,
            values: [params.name],
        });
    }
}
