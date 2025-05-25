import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({
    tableName: 'language',
})
export class LanguageEntity {
    @PrimaryKey({
        type: 'int4',
        autoincrement: true,
    })
    public language_id: number;

    @Property({ type: 'varchar', length: 20 })
    public name: string;

    @Property({
        type: 'timestamptz',
        defaultRaw: 'now()',
    })
    public last_updated: Date;
}
