import { Injectable } from '@nestjs/common';
import { Admin } from 'kafkajs';
import { InjectKafkaAdmin } from './producer.decorators';

@Injectable()
export class KafkaProducerIndicator {
    constructor(@InjectKafkaAdmin() private readonly admin: Admin) {}

    /**
     * @returns health state of producer connection
     */
    public async isHealthy(): Promise<boolean> {
        const cluster = await this.admin.describeCluster();
        return cluster.brokers.length > 0;
    }
}
