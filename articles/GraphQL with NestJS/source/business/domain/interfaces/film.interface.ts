import { DateTime } from 'luxon';

export interface TFilmModel {
    id: number;
    title: string;
    description?: string;
    releaseYear?: number;
    rentalDuration: number;
    rentalRate: number;
    length?: number;
    replacementCost: number;
    rating: string;
    specialFeatures?: string[];
    updated: DateTime;
}

export interface TFilmSchema {
    id: number;
    title: string;
    description?: string;
    releaseYear?: number;
    length?: number;
    rating: string;
    tags?: string[];
}
