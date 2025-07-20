import { MigrationHandler } from './handler.interfaces';
import { MigrationParams } from './params.interfaces';

/**
 * @private
 */
export interface MigrationProvider extends MigrationHandler {
    name: string;
    params: MigrationParams;
}
