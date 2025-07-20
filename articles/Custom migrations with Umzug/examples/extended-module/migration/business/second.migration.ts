import { MigrationHandler, Migration } from '../../../../source';
import { ExampleExtendedRepository } from '../integration/repository';
import { ExtendedDoc } from '../migration.types';

@Migration({
    order: 2,
})
export class ExtendedSecondMigration implements MigrationHandler {
    constructor(private readonly repository: ExampleExtendedRepository) {}

    public async up(): Promise<void> {
        const documents = await this.repository.find();

        const now = Date.now();
        const updated = documents.map<ExtendedDoc>((doc) => ({
            ...doc,
            count: doc.count * 10,
            timestamp: now,
        }));

        await this.repository.upsert(updated);
    }

    public async down(): Promise<void> {
        await this.repository.clear();
    }
}
