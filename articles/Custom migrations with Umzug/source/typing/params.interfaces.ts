export interface MigrationParams {
    /**
     * Use timestamp for migrations order
     */
    order: number;

    /**
     * Name of migration to store in database
     * Default: migration class name
     */
    alias?: string;

    /**
     * Always ignore migration
     * Default: false
     */
    skip?: boolean;
}
