import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { ExtendedDoc } from '../migration.types';

@Injectable()
export class ExampleExtendedMocker {
    public generate(count?: number): ExtendedDoc[] {
        const docs: ExtendedDoc[] = [];

        const now = Date.now();
        const total = count ?? faker.number.int({ min: 10, max: 100 });

        for (let index = 0; index < total; index += 1) {
            docs.push({
                id: faker.string.uuid(),
                name: faker.person.fullName().toLowerCase(),
                count: faker.number.int({ min: 0, max: 10 }),
                timestamp: now,
            });
        }

        return docs;
    }
}
