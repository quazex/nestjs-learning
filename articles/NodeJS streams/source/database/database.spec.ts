import { createWriteStream } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';
import axios from 'axios';
import { Stringifier } from 'csv-stringify';
import { Collection, MongoClient } from 'mongodb';
import JsonParser from 'stream-json/Parser';
import JsonArray from 'stream-json/streamers/StreamArray';
import { DatabaseStringifier } from './database.stringifier';
import { DatabaseWritable } from './database.writable';

describe('Database', () => {
    let container: StartedMongoDBContainer;
    let client: MongoClient;
    let coll: Collection;

    beforeAll(async() => {
        container = await new MongoDBContainer().withReuse().start();
        client = await MongoClient.connect(container.getConnectionString(), {
            directConnection: true,
        });
        coll = client.db().collection('population');
    });

    afterAll(async() => {
        await client.close();
        await container.stop();
    });

    test('Download and write files from jsonl file', async() => {
        //
        // WRITE
        //
        const fileSource = await axios({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/sharmadhiraj/free-json-datasets/refs/heads/master/datasets/world-population-by-country-2020.json',
            responseType: 'stream',
        });

        const jsonParser = new JsonParser();
        const jsonArray = new JsonArray();

        const dbTarget = new DatabaseWritable(coll);

        /**
         * STEPS:
         * 1. Stream json array from url
         * 2. Parse stream as JSON
         * 3. Stream each object
         * 4. Write to database
         */
        await pipeline(
            fileSource.data,
            jsonParser,
            jsonArray,
            dbTarget,
        );

        //
        // READ
        //
        const dbSource = coll.find().stream();
        const dbStringifier = new DatabaseStringifier();

        const csvEncoder = new Stringifier({
            header: true,
            quoted: true,
        });

        const resultPath = join(__dirname, 'population.result.csv');
        const fsTarget = createWriteStream(resultPath);

        /**
         * STEPS:
         * 1. Stream documents from database
         * 2. Stringify some fields
         * 2. Convert document to CSV row
         * 3. Write to file
         */
        await pipeline(
            dbSource,
            dbStringifier,
            csvEncoder,
            fsTarget,
        );

        expect(dbTarget.total).toBeGreaterThan(0);
    });
});
