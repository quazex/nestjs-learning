import Stream from 'stream';
import { WritableCallback } from '../types';
import { CurrencyExchanges, CurrencyRequest } from './tricks.types';

export class TricksExchanger extends Stream.Transform {
    private readonly storage = new Map<string, number>();

    constructor(private readonly currencyClient: CurrencyExchanges) {
        super({
            objectMode: true,
        });
    }

    /**
     * Fetch initial data from remote server before processing stream
     */
    public async _construct(callback: WritableCallback): Promise<void> {
        const currencies = await this.currencyClient.fetch();
        for (const [currency, exchange] of Object.entries(currencies.btc)) {
            this.storage.set(currency, exchange);
        }
        callback(null);
    }

    /**
     * Process data in stream
     */
    public _transform(
        chunk: CurrencyRequest,
        encoding: BufferEncoding,
        callback: Stream.TransformCallback,
    ): void {
        const exchange = this.storage.get(chunk.code);
        if (typeof exchange === 'number') {
            this.push(chunk.value * exchange);
        }
        callback(null, null);
    }

    /**
     * Clear internal storage at the end of stream
     */
    public _final(callback: WritableCallback): void {
        this.storage.clear();
        callback(null);
    }
}
