import Stream from 'stream';
import { WritableCallback } from '../types';
import { JsonChunk, JsonMovie, JsonStats } from './json.types';

export class JsonAggregator extends Stream.Writable {
    private readonly storage: Map<string, number>;

    constructor() {
        super({
            objectMode: true,
        });
        this.storage = new Map();
    }

    public _write(
        chunk: JsonChunk<JsonMovie>,
        encoding: BufferEncoding,
        callback: WritableCallback,
    ): void {
        const prev = this.storage.get(chunk.value.rating) ?? 0;
        this.storage.set(chunk.value.rating, prev + 1);
        callback(null);
    }

    public getStats(): JsonStats[] {
        const stats: JsonStats[] = [];
        for (const [rating, count] of this.storage.entries()) {
            stats.push({
                rating,
                count,
            });
        }
        return stats.sort((a, b) => b.count - a.count);
    }
}
