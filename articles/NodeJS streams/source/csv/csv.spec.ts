import { createWriteStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import { Parser } from 'csv-parse';
import { Stringifier } from 'csv-stringify';
import { CsvCounter } from './csv.counter';
import { CsvTransformer } from './csv.transformer';
import { CsvWritable } from './csv.writable';

describe('CSV', () => {
    test('Download and count rows in large csv file', async() => {
        const fileSource = await axios({
            method: 'GET',
            url: 'https://github.com/MainakRepositor/Datasets/raw/refs/heads/master/AB_NYC_2019.csv',
            responseType: 'stream',
        });

        const csvDecoder = new Parser({});
        const target = new CsvWritable();

        /**
         * STEPS:
         * 1. Stream of data from url
         * 2. Parse data to CSV rows
         * 3. Count rows
         */
        await pipeline(
            fileSource.data,
            csvDecoder,
            target,
        );

        expect(target.total).toBe(48_896);
        expect(target.duration).toBeGreaterThan(0);
    });

    test('Download and transform rows in csv file', async() => {
        const fileSource = await axios({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/MainakRepositor/Datasets/refs/heads/master/house%20price.csv',
            responseType: 'stream',
        });

        const csvDecoder = new Parser({
            columns: true,
        });
        const csvEncoder = new Stringifier({});

        const rowsCounter = new CsvCounter();
        const rowsTransformer = new CsvTransformer();

        const resultPath = join(__dirname, 'transform.result.csv');
        const target = createWriteStream(resultPath);

        /**
         * STEPS:
         * 1. Stream of data from url
         * 2. Parse data to CSV rows
         * 3. Count rows
         * 4. Rows transformer
         * 5. Convert to CSV
         * 6. Write to filesystem
         */
        await pipeline(
            fileSource.data,
            csvDecoder,
            rowsCounter,
            rowsTransformer,
            csvEncoder,
            target,
        );

        expect(rowsCounter.total).toBe(4_600);
        expect(rowsCounter.duration).toBeGreaterThan(0);
    });
});
