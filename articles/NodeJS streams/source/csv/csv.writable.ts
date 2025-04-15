import Stream from 'stream';
import { Writable, WritableCallback } from '../types';

export class CsvWritable<TData> extends Stream.Writable implements Writable<TData> {
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

    public _print(): void {
        process.stdout.write(`Fetched ${this.total} rows`);
        process.stdout.write('\n');
    }

    public _write(
        chunk: TData,
        encoding: BufferEncoding,
        callback: WritableCallback,
    ): void {
        this.total += 1;

        const needToDisplay = this.total % 10_000 === 0;
        if (needToDisplay) {
            this._print();
        }

        callback(null);
    }

    public _final(callback: WritableCallback): void {
        this.duration = Date.now() - this.started;
        this._print();
        callback(null);
    }
}
