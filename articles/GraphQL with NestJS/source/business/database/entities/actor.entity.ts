import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { TActorEntity } from '../interfaces/actor.interface';
import { FilmEntity } from './film.entity';

@Entity({
    tableName: 'actor',
})
export class ActorEntity implements TActorEntity {
    @PrimaryKey({
        type: 'int4',
        autoincrement: true,
    })
    public actor_id: number;

    @Property({ type: 'text' })
    public first_name: string;

    @Property({ type: 'text' })
    public last_name: string;

    @Property({
        type: 'timestamptz',
        defaultRaw: 'now()',
    })
    public last_updated: Date;

    @ManyToMany<ActorEntity, FilmEntity>({
        owner: false,
        entity: () => FilmEntity,
    })
    public films = new Collection<FilmEntity>(this);
}
