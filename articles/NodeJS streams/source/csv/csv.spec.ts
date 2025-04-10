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

        await pipeline(fileSource.data, csvDecoder, target);

        expect(target.total).toBeGreaterThan(0);
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

        await pipeline(
            fileSource.data,
            csvDecoder,
            rowsCounter,
            rowsTransformer,
            csvEncoder,
            target,
        );

        expect(rowsCounter.total).toBeGreaterThan(0);
        expect(rowsCounter.duration).toBeGreaterThan(0);
    });
});
