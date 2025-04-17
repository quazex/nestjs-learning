import { faker } from '@faker-js/faker';
import { CustomStrategy } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';
import { KafkaConfig, logLevel } from 'kafkajs';
import { Wait } from 'testcontainers';
import { KafkaConsumerModule, KafkaConsumerStrategy } from '../source/consumer';
import { KafkaProducerModule } from '../source/producer';
import { KafkaTestingBootstrap } from './testing.bootstrap';
import { KafkaTestingController } from './testing.controller';


export class KafkaTestingFactory {
    constructor(
        public readonly container: StartedKafkaContainer,
        public readonly application: NestExpressApplication,
        public readonly module: TestingModule,
    ) {}

    public async close(): Promise<void> {
        await this.module.close();
        await this.application.close();
        await this.container.stop();
    }

    public static async init(): Promise<KafkaTestingFactory> {
        const appPort = faker.number.int({ min: 5_000, max: 6_000 });

        //
        // CONTAINER
        //
        const builderContainer = new KafkaContainer('confluentinc/cp-kafka:7.6.1');
        const testingContainer = await builderContainer
            .withWaitStrategy(Wait.forLogMessage(/kafka server started/i))
            .withLogConsumer((stream) => {
                stream.pipe(process.stdout);
            })
            .withReuse()
            .withKraft()
            .start();

        const host = testingContainer.getHost();
        const port = testingContainer.getFirstMappedPort();

        const config: KafkaConfig = {
            brokers: [
                `${host}:${port}`,
            ],
            logLevel: logLevel.NOTHING,
        };

        //
        // MODULE
        //
        const builderModule = Test.createTestingModule({
            imports: [
                KafkaConsumerModule.forRoot({
                    connection: {
                        ...config,
                        clientId: 'quazex',
                    },
                    consumer: {
                        groupId: 'quazex.testing',
                        allowAutoTopicCreation: false,
                        maxWaitTimeInMs: 1_000,
                        minBytes: 1,
                    },
                    concurrency: 1,
                }),
                KafkaProducerModule.forRoot({
                    connection: config,
                }),
            ],
            providers: [
                KafkaTestingBootstrap,
            ],
            controllers: [
                KafkaTestingController,
            ],
        });

        const testingModule = await builderModule.compile();
        const testingApplication = testingModule.createNestApplication<NestExpressApplication>();

        //
        // PREPARING
        //
        const bootstrap = testingModule.get(KafkaTestingBootstrap);
        await bootstrap.createTopics();

        //
        // SERVER
        //
        testingModule.enableShutdownHooks();

        testingApplication.connectMicroservice<CustomStrategy>({
            strategy: testingModule.get(KafkaConsumerStrategy),
        });

        await testingApplication.startAllMicroservices();
        await testingApplication.listen(appPort);

        return new KafkaTestingFactory(testingContainer, testingApplication, testingModule);
    }
}
