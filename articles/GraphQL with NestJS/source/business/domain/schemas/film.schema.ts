import { Field, ObjectType } from '@nestjs/graphql';
import { TFilmSchema } from '../interfaces/film.interface';

@ObjectType('Film')
export class FilmSchema implements TFilmSchema {
    @Field()
    public id: number;

    @Field()
    public title: string;

    @Field({ nullable: true })
    public description?: string;

    @Field({ nullable: true })
    public releaseYear?: number;

    @Field({ nullable: true })
    public length?: number;

    @Field()
    public rating: string;

    @Field(() => [String], { nullable: true })
    public tags: string[];
}
