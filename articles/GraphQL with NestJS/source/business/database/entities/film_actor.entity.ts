import { Entity, Property } from '@mikro-orm/core';
import { ActorEntity } from './actor.entity';
import { FilmEntity } from './film.entity';

@Entity({
    tableName: 'film_actor',
})
export class FilmActorEntity {
    @Property({
        primary: true,
        type: 'int4',
        name: 'film_id',
    })
    public film: FilmEntity;

    @Property({
        primary: true,
        type: 'int4',
        name: 'actor_id',
    })
    public actor: ActorEntity;

    @Property({
        type: 'timestamptz',
        defaultRaw: 'now()',
    })
    public last_updated: Date;
}
