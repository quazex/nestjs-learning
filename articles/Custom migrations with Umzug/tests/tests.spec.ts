import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { TestingApplication } from './tests.application';
import { TestsRepository } from './tests.repository';

describe('Umzug Postgres', () => {
    const testingApp = new TestingApplication();

    beforeAll(testingApp.init.bind(testingApp));
    afterAll(testingApp.close.bind(testingApp));

    test('Should successfully provide instance', async() => {
        expect(testingApp.repository).toBeInstanceOf(TestsRepository);
        await testingApp.umzug.up();

        const count = await testingApp.repository.count();
        expect(count).toBeGreaterThan(0);
    });
});
