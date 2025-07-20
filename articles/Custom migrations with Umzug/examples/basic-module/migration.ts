import { faker } from '@faker-js/faker';
import { MigrationHandler, Migration } from '../../source';
import { ExampleBasicRepository } from './repository';

@Migration({
    order: 1,
})
export class ExampleBasicMigration implements MigrationHandler {
    constructor(private readonly repository: ExampleBasicRepository) {}

    public async up(): Promise<void> {
        await this.repository.insert({
            id: faker.string.uuid(),
            name: faker.person.fullName().toLowerCase(),
            count: faker.number.int({ min: 0, max: 10 }),
            timestamp: Date.now(),
        });
    }

    public async down(): Promise<void> {
        await this.repository.clear();
    }
}
