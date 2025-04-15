export interface JsonChunk<TValue = unknown> {
    key: number;
    value: TValue;
}

export interface Population {
    position: string;
    country: string;
    population: string;
    yearly_change: string;
    net_change: string;
    density_per_square_km: string;
    land_are_in_square_km: string;
    migrants_net: string;
    fertility_rate: string;
    median_age: string;
    urban_population: string;
    world_share: string;
}
