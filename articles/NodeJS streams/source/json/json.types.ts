export interface JsonMovie {
    name: string;
    oscar: number;
    released_year: number;
    poster: string;
    rating: string;
    duration: string;
    genre: string;
    summary: string;
    directors: string[];
    stars: string[];
}

export interface JsonChunk<TValue = unknown> {
    key: number;
    value: TValue;
}

export interface JsonStats {
    rating: string;
    count: number;
}
