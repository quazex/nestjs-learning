/**
 * @private
 */
export interface LogMigrating {
    event: 'migrating';
    name: string;
    durationSeconds: number;
}

/**
 * @private
 */
export interface LogMigrated {
    event: 'migrated';
    name: string;
}

/**
 * @private
 */
export interface LogReverting {
    event: 'reverting';
    name: string;
    durationSeconds: number;
}

/**
 * @private
 */
export interface LogCreated {
    event: 'created';
    path: string;
}

/**
 * @private
 */
export interface LogReverted {
    event: 'reverted';
    name: string;
}

/**
 * @private
 */
export type LogMessage = Record<string, unknown>;

/**
 * @private
 */
export type LogInfo =
  | LogMigrating
  | LogMigrated
  | LogReverting
  | LogReverted
  | LogCreated
  | LogMessage;
