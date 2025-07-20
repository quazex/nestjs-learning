/**
 * Required to use with Migration decorator
 */
export interface MigrationHandler {
    up(): Promise<void>;
    down(): Promise<void>;
}
