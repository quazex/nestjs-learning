import { SetMetadata } from '@nestjs/common';
import { MigrationParams } from '../typing/params.interfaces';
import { UMZUG_METADATA_KEY } from './migrations.tokens';

export const Migration = (params: MigrationParams): ClassDecorator => (
    SetMetadata(UMZUG_METADATA_KEY, params)
);
