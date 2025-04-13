import { Readable, Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import { TricksAggregator } from './tricks.aggregator';
import { TricksExchanger } from './tricks.exchanger';
import { CurrencyExchanges, CurrencyRequest, CurrencyResponse } from './tricks.types';
import { TricksWritable } from './tricks.writable';

describe('Tricks', () => {
    const arr = ['one', 'two', 'three'];

    test('Convert iterable to Readable', async() => {
        const stream = Readable.from(arr);
        const target = new TricksWritable();

        await pipeline(stream, target);

        expect(target.total).toBe(arr.length);
    });

    test('Async iterator', async() => {
        const rows: string[] = [];

        for await (const item of Readable.from(arr)) {
            rows.push(item);
        }

        expect(rows).toMatchObject(arr as never);
    });

    test('Stream constructor', async() => {
        const stream = Readable.from(arr);
        const converter = new Transform({
            objectMode: true,
            transform(chunk, encoding, callback): void {
                if (typeof chunk === 'string') {
                    this.push(chunk.toUpperCase());
                }
                callback(null, null);
            },
        });
        const target = new TricksWritable();

        await pipeline(
            stream,
            converter,
            target,
        );

        expect(target.total).toBe(arr.length);
    });

    test('Writable lifetime hooks', async() => {
        const data: CurrencyRequest[] = [{
            code: 'usd',
            value: 100,
        }, {
            code: 'eur',
            value: 2,
        }, {
            code: 'jpy',
            value: 40,
        }];

        const fetcher: CurrencyExchanges = {
            fetch: async() => {
                const fileSource = await axios<CurrencyResponse>({
                    method: 'GET',
                    url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.json',
                    responseType: 'json',
                });
                return fileSource.data;
            },
        };

        const source = Readable.from(data);
        const exchanger = new TricksExchanger(fetcher);
        const target = new TricksAggregator();

        await pipeline(
            source,
            exchanger,
            target,
        );

        const summary = target.getTotal();
        expect(summary).toBeGreaterThan(0);
    });
});
