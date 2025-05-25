import { DateTime } from 'luxon';
import { FilmEntity } from '../../database/entities/film.entity';
import { TFilmModel, TFilmSchema } from '../interfaces/film.interface';

export class FilmModel implements TFilmModel {
    #id: number;
    #title: string;
    #description?: string;
    #releaseYear?: number;
    #rentalDuration: number;
    #rentalRate: number;
    #length?: number;
    #replacementCost: number;
    #rating: string;
    #specialFeatures?: string[];
    #updated: DateTime;

    private constructor(model: TFilmModel) {
        this.#id = model.id;
        this.#title = model.title;
        this.#description = model.description;
        this.#releaseYear = model.releaseYear;
        this.#rentalDuration = model.rentalDuration;
        this.#rentalRate = model.rentalRate;
        this.#length = model.length;
        this.#replacementCost = model.replacementCost;
        this.#rating = model.rating;
        this.#specialFeatures = model.specialFeatures;
        this.#updated = model.updated;
    }

    public get id(): number {
        return this.#id;
    }

    public get title(): string {
        return this.#title;
    }

    public get description(): string | undefined {
        return this.#description;
    }

    public get releaseYear(): number | undefined {
        return this.#releaseYear;
    }

    public get rentalDuration(): number {
        return this.#rentalDuration;
    }

    public get rentalRate(): number {
        return this.#rentalRate;
    }

    public get length(): number | undefined {
        return this.#length;
    }

    public get replacementCost(): number {
        return this.#replacementCost;
    }

    public get rating(): string {
        return this.#rating;
    }

    public get specialFeatures(): string[] | undefined {
        return this.#specialFeatures;
    }

    public get updated(): DateTime {
        return this.#updated;
    }

    public static fromEntity(entity: FilmEntity): FilmModel {
        return new FilmModel({
            id: entity.film_id,
            title: entity.title,
            description: entity.description,
            releaseYear: entity.release_year,
            rentalDuration: entity.rental_duration,
            rentalRate: entity.rental_rate,
            length: entity.length,
            replacementCost: entity.replacement_cost,
            rating: entity.rating,
            specialFeatures: entity.special_features,
            updated: DateTime.fromJSDate(entity.last_updated),
        });
    }

    public toSchema(): TFilmSchema {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            releaseYear: this.releaseYear,
            length: this.length,
            rating: this.rating,
            tags: this.specialFeatures,
        };
    }
}
