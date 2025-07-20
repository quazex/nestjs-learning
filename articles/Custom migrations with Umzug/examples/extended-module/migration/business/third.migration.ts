import { MigrationHandler, Migration } from '../../../../source';
import { ExampleExtendedRepository } from '../integration/repository';
import { ExtendedDoc } from '../migration.types';

@Migration({
    order: 3,
})
export class ExtendedThirdMigration implements MigrationHandler {
    constructor(private readonly repository: ExampleExtendedRepository) {}

    public async up(): Promise<void> {
        const documents = await this.repository.find();

        const now = Date.now();
        const updated = documents.map<ExtendedDoc>((doc) => ({
            ...doc,
            name: doc.name.toUpperCase(),
            timestamp: now,
        }));

        await this.repository.upsert(updated);
    }

    public async down(): Promise<void> {
        await this.repository.clear();
    }
}
