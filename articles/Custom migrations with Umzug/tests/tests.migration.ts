import { faker } from '@faker-js/faker';
import { Migration, MigrationHandler } from '../source';
import { TestsRepository } from './tests.repository';

@Migration({
    order: 1,
})
export class TestsMigration implements MigrationHandler {
    constructor(private readonly repository: TestsRepository) {}

    public async up(): Promise<void> {
        const now = Date.now();

        await this.repository.insert({
            id: faker.string.uuid(),
            name: faker.person.fullName().toLowerCase(),
            count: faker.number.int({ min: 0, max: 10 }),
            timestamp: Math.floor(now / 1_000),
        });
    }

    public async down(): Promise<void> {
        await this.repository.clear();
    }
}
