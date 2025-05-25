export interface TFilmEntity {
    film_id: number;
    title: string;
    description?: string;
    release_year?: number;
    rental_duration: number;
    rental_rate: number;
    length?: number;
    replacement_cost: number;
    rating: string;
    special_features?: string[];
    last_updated: Date;
}
