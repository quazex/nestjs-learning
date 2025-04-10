import Stream from 'stream';

export class CsvCounter<TData> extends Stream.Transform {
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

    public _transform(
        chunk: TData,
        encoding: BufferEncoding,
        callback: Stream.TransformCallback,
    ): void {
        this.total += 1;

        const needToDisplay = this.total % 10_000 === 0;
        if (needToDisplay) {
            this._print();
        }

        callback(null, chunk);
    }

    public _final(callback: Stream.TransformCallback): void {
        this.duration = Date.now() - this.started;
        this._print();
        callback(null);
    }
}
