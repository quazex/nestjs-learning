import Stream from 'stream';
import { Writable, WritableCallback } from '../types';

export class TricksWritable<TData> extends Stream.Writable implements Writable<TData> {
    private started: number;

    public total: number;
    public duration: number;

    constructor() {
        super({
            objectMode: true,
        });

        this.started = Date.now();
        this.total = 0;
        this.duration = 0;
    }

    public _write(
        chunk: TData,
        encoding: BufferEncoding,
        callback: WritableCallback,
    ): void {
        this.total += 1;
        callback(null);
    }

    public _final(callback: WritableCallback): void {
        this.duration = Date.now() - this.started;
        callback(null);
    }
}
