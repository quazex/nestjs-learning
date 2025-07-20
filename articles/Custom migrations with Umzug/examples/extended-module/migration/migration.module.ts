import { Module } from '@nestjs/common';
import { ExtendedFirstMigration } from './business/first.migration';
import { ExampleExtendedMocker } from './business/mocker';
import { ExtendedSecondMigration } from './business/second.migration';
import { ExtendedThirdMigration } from './business/third.migration';
import { ExampleExtendedRepository } from './integration/repository';

@Module({
    providers: [
        ExampleExtendedRepository,
        ExampleExtendedMocker,
        ExtendedFirstMigration,
        ExtendedSecondMigration,
        ExtendedThirdMigration,
    ],
})
export class ExampleMigrationModule {}
