import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';
import { POSTGRES_CLIENT } from './postgres.tokens';

@Module({})
export class UmzugPostgresBootstrap implements OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject(POSTGRES_CLIENT) private readonly client: Client,
    ) {}

    public async onModuleInit(): Promise<void> {
        await this.client.connect();
    }

    public async onModuleDestroy(): Promise<void> {
        await this.client.end();
    }
}
