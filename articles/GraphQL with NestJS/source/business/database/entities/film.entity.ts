import { ArrayType, Collection, Entity, ManyToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { TFilmEntity } from '../interfaces/film.interface';
import { ActorEntity } from './actor.entity';
import { FilmActorEntity } from './film_actor.entity';
import { LanguageEntity } from './language.entity';

@Entity({
    tableName: 'film',
})
export class FilmEntity implements TFilmEntity {
    @PrimaryKey({
        type: 'int4',
        autoincrement: true,
    })
    public film_id: number;

    @Property({ type: 'text' })
    public title: string;

    @Property({
        type: 'text',
        nullable: true,
    })
    public description?: string;

    @Property({
        type: 'int4',
        nullable: true,
    })
    public release_year?: number;

    @OneToOne({
        type: 'int4',
        name: 'language_id',
        owner: true,
        entity: LanguageEntity.name,
    })
    public language: LanguageEntity;

    @OneToOne({
        type: 'int4',
        name: 'original_language_id',
        owner: true,
        nullable: true,
        entity: LanguageEntity.name,
    })
    public original_language?: LanguageEntity;

    @Property({
        type: 'int2',
        default: 3,
    })
    public rental_duration: number;

    @Property({
        type: 'numeric',
        precision: 4,
        scale: 2,
        default: 4.99,
    })
    public rental_rate: number;

    @Property({
        type: 'int2',
        nullable: true,
    })
    public length: number;

    @Property({
        type: 'numeric',
        precision: 5,
        scale: 2,
        default: 4.99,
    })
    public replacement_cost: number;

    @Property({
        type: 'mpaa_rating',
        default: 'G',
    })
    public rating: string;

    @Property({
        type: ArrayType,
        nullable: true,
    })
    public special_features?: string[];

    @Property({
        type: 'timestamptz',
        defaultRaw: 'now()',
    })
    public last_updated: Date;

    @ManyToMany<FilmEntity, ActorEntity>({
        entity: () => ActorEntity,
        owner: true,
        pivotTable: 'film_actor',
        pivotEntity: () => FilmActorEntity,
    })
    public actors = new Collection<ActorEntity>(this);
}
