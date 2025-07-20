import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, Table } from 'typeorm';
import { TestsEntity } from './tests.entity';
import { TestsDoc } from './tests.types';

@Injectable()
export class TestsRepository implements OnModuleInit {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
        @InjectRepository(TestsEntity) private readonly repository: Repository<TestsEntity>,
    ) {}

    public async onModuleInit(): Promise<void> {
        const query = this.dataSource.createQueryRunner();

        const table = new Table({
            name: 'tests_table',
            columns: [{
                name: 'id',
                type: 'uuid',
            }, {
                name: 'name',
                type: 'text',
            }, {
                name: 'count',
                type: 'int4',
            }, {
                name: 'timestamp',
                type: 'int4',
            }],
        });

        await query.createTable(table);
    }

    public async insert(document: TestsDoc): Promise<void> {
        await this.repository.save(document);
    }

    public async clear(): Promise<void> {
        await this.repository.deleteAll();
    }

    public async count(): Promise<number> {
        const rows = await this.repository.count();
        return rows;
    }
}
