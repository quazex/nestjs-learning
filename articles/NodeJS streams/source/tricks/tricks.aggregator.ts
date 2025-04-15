import Stream from 'stream';
import { WritableCallback } from '../types';

export class TricksAggregator extends Stream.Writable {
    private total: number;

    constructor() {
        super({
            objectMode: true,
        });
        this.total = 0;
    }

    public _write(
        chunk: number,
        encoding: BufferEncoding,
        callback: WritableCallback,
    ): void {
        if (typeof chunk === 'number') {
            this.total += chunk;
        }
        callback(null);
    }

    public getTotal(): number {
        return this.total;
    }
}
