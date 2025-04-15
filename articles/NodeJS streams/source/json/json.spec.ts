import { pipeline } from 'stream/promises';
import { describe, expect, test } from '@jest/globals';
import axios from 'axios';
import JsonlParser from 'stream-json/jsonl/Parser';
import JsonParser from 'stream-json/Parser';
import JsonArray from 'stream-json/streamers/StreamArray';
import { JsonAggregator } from './json.aggregator';
import { JsonWritable } from './json.writable';

describe('JSON', () => {
    test('Download and count rows in jsonl file', async() => {
        const fileSource = await axios({
            method: 'GET',
            url: 'https://github.com/explosion/prodigy-recipes/raw/refs/heads/master/example-datasets/news_headlines.jsonl',
            responseType: 'stream',
        });

        const decoder = new JsonlParser({});
        const target = new JsonWritable();

        /**
         * STEPS:
         * 1. Stream data from url
         * 2. Parse data to JSON rows
         * 3. Count rows
         */
        await pipeline(
            fileSource.data,
            decoder,
            target,
        );

        expect(target.total).toBe(200);
        expect(target.duration).toBeGreaterThan(0);
    });

    test('Download and aggregate records from jsonl file', async() => {
        const fileSource = await axios({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/sharmadhiraj/free-json-datasets/refs/heads/master/datasets/oscar-best-picture-award-winners.json',
            responseType: 'stream',
        });

        const jsonParser = new JsonParser();
        const jsonArray = new JsonArray();
        const target = new JsonAggregator();

        /**
         * STEPS:
         * 1. Stream json array from url
         * 2. Parse stream as JSON
         * 3. Stream each object
         * 4. Aggregate items
         */
        await pipeline(
            fileSource.data,
            jsonParser,
            jsonArray,
            target,
        );

        const stats = target.getStats();
        const popular = stats.at(0);

        expect(stats.length).toBe(8);
        expect(popular?.count).toBe(31);
    });
});
