import Stream from 'stream';
import { DateTime } from 'luxon';
import { CsvStocks } from './csv.types';

export class CsvTransformer extends Stream.Transform {
    constructor() {
        super({
            objectMode: true,
        });
    }

    public _transform(
        chunk: CsvStocks,
        encoding: BufferEncoding,
        callback: Stream.TransformCallback,
    ): void {
        const dateTime = DateTime.fromSQL(chunk.date);
        const dateISO = dateTime.toISODate();

        chunk.date = dateISO;

        callback(null, chunk);
    }
}
