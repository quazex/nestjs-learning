import { faker } from '@faker-js/faker';
import { TestingClicks } from './testing.types';

export class TestingMocks {
    public static getClicks(): TestingClicks[] {
        const data: TestingClicks[] = [];

        const count = faker.number.int({ min: 100, max: 200 });
        for (let index = 0; index < count; index += 1) {
            data.push({
                id: faker.string.uuid(),
                url: faker.internet.url(),
                agent: faker.internet.userAgent(),
                email: faker.internet.email(),
                timestamp: faker.date.anytime().getTime(),
            });
        }

        return data;
    }
}
