import { setTimeout } from 'timers/promises';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { KafkaConsumerIndicator } from '../source/consumer';
import { KafkaProducerClient, KafkaProducerIndicator } from '../source/producer';
import { KafkaTestingController } from './testing.controller';
import { TestingMocks } from './testing.mocks';
import { KafkaTestingFactory } from './testing.module';
import { KafkaTestingRouting } from './testing.routing';

describe('Kafka', () => {
    let testing: KafkaTestingFactory;

    beforeAll(async() => {
        testing = await KafkaTestingFactory.init();
    });

    afterAll(async() => {
        await testing.close();
    });

    test('Healthcheck', async() => {
        const producer = testing.module.get(KafkaProducerIndicator);
        const consumer = testing.module.get(KafkaConsumerIndicator);

        const consumerState = await consumer.isHealthy();
        const isProducerHealth = await producer.isHealthy();

        expect(consumerState.isHealthy).toBe(true);
        expect(isProducerHealth).toBe(true);
    });

    test('Consuming messages', async() => {
        const producer = testing.module.get(KafkaProducerClient);
        const controller = testing.module.get(KafkaTestingController);

        const data = TestingMocks.getClicks();

        await producer.send({
            topic: KafkaTestingRouting.clicks,
            payload: data,
        });

        /**
         * Ожидание и проверка ответа
         */
        await setTimeout(2_000);

        expect(controller.clicks.length).toBe(data.length);
    });
});
