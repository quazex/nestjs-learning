import { Transform, TransformCallback } from 'stream';
import { WithId } from 'mongodb';
import { Population } from './database.types';

export class DatabaseStringifier extends Transform {
    constructor() {
        super({
            objectMode: true,
        });
    }

    public _transform(
        chunk: WithId<Population>,
        encoding: BufferEncoding,
        callback: TransformCallback,
    ): void {
        callback(null, {
            id: chunk._id.toString(),
            position: chunk.position,
            country: chunk.country,
            population: chunk.population,
            yearly_change: chunk.yearly_change,
            net_change: chunk.net_change,
            density_per_square_km: chunk.density_per_square_km,
            land_are_in_square_km: chunk.land_are_in_square_km,
            migrants_net: chunk.migrants_net,
            fertility_rate: chunk.fertility_rate,
            median_age: chunk.median_age,
            urban_population: chunk.urban_population,
            world_share: chunk.world_share,
        });
    }
}
