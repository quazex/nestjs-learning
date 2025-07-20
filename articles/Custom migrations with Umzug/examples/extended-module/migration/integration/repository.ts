import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectKnex } from '@quazex/nestjs-knex';
import { Knex } from 'knex';
import { ExtendedDoc } from '../migration.types';

@Injectable()
export class ExampleExtendedRepository implements OnModuleInit, OnModuleDestroy {
    private readonly table = 'extended_table';

    constructor(@InjectKnex() private readonly client: Knex) {}

    public async onModuleInit(): Promise<void> {
        const isExists = await this.client.schema.hasTable(this.table);
        if (!isExists) {
            await this.client.schema.createTable(this.table, (table) => {
                table.uuid('id').unique();
                table.text('name');
                table.integer('count');
                table.bigInteger('timestamp');
            });
        }
    }

    public async onModuleDestroy(): Promise<void> {
        await this.client.destroy();
    }

    public async find(): Promise<ExtendedDoc[]> {
        const rows = await this.client<ExtendedDoc>(this.table);
        return rows;
    }

    public async upsert(documents: ExtendedDoc[]): Promise<void> {
        await this.client(this.table)
            .insert(documents)
            .onConflict('id')
            .merge([
                'name',
                'count',
                'timestamp',
            ]);
    }

    public async clear(): Promise<void> {
        await this.client(this.table).delete();
    }
}
