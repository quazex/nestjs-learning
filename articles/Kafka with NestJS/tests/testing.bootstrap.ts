import { Injectable } from '@nestjs/common';
import { Admin, ITopicConfig } from 'kafkajs';
import { InjectKafkaAdmin } from '../source/producer';
import { KafkaTestingRouting } from './testing.routing';

@Injectable()
export class KafkaTestingBootstrap {
    constructor(@InjectKafkaAdmin() private readonly admin: Admin) {}

    public async createTopics(): Promise<void> {
        await this.admin.connect();

        const patterns = Object.values(KafkaTestingRouting);
        const topics = patterns.map<ITopicConfig>((pattern) => ({
            topic: pattern,
            numPartitions: 1,
            replicationFactor: 1,
        }));

        await this.admin.createTopics({
            topics,
        });

        await this.admin.disconnect();
    }
}
