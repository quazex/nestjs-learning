import Stream from 'stream';
import { Collection } from 'mongodb';
import { WritableCallback } from '../types';
import { JsonChunk, Population } from './database.types';

export class DatabaseWritable extends Stream.Writable {
    private buffer: Population[];
    private started: number;

    public total: number;
    public duration: number;

    constructor(private readonly collection: Collection) {
        super({
            objectMode: true,
        });

        this.buffer = [];
        this.started = Date.now();

        this.total = 0;
        this.duration = 0;
    }

    private async _insert(): Promise<void> {
        const items = structuredClone(this.buffer);
        await this.collection.insertMany(items);

        this.buffer.length = 0;

        process.stdout.write(`Insert ${items.length} documents`);
        process.stdout.write('\n');
    }

    public async _write(
        chunk: JsonChunk<Population>,
        encoding: BufferEncoding,
        callback: WritableCallback,
    ): Promise<void> {
        this.buffer.push(chunk.value);
        this.total += 1;

        if (this.buffer.length >= 100) {
            await this._insert();
        }

        callback(null);
    }

    public async _final(callback: WritableCallback): Promise<void> {
        this.duration = Date.now() - this.started;

        if (this.buffer.length > 0) {
            await this._insert();
        }

        callback(null);
    }
}
