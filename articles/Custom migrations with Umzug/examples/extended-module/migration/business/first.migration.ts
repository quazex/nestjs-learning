import { MigrationHandler, Migration } from '../../../../source';
import { ExampleExtendedRepository } from '../integration/repository';
import { ExampleExtendedMocker } from './mocker';

@Migration({
    order: 1,
})
export class ExtendedFirstMigration implements MigrationHandler {
    constructor(
        private readonly mocker: ExampleExtendedMocker,
        private readonly repository: ExampleExtendedRepository,
    ) {}

    public async up(): Promise<void> {
        const documents = this.mocker.generate();
        await this.repository.upsert(documents);
    }

    public async down(): Promise<void> {
        await this.repository.clear();
    }
}
