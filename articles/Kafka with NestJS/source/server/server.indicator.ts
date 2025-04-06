import { Inject, Injectable } from '@nestjs/common';
import { Consumer, ConsumerGroupState } from 'kafkajs';
import { KafkaServerToken } from './server.tokens';
import { KafkaServerHealth } from './server.types';

@Injectable()
export class KafkaServerIndicator {
    private readonly success = new Set<ConsumerGroupState>([
        'PreparingRebalance',
        'CompletingRebalance',
        'Stable',
    ]);

    constructor(@Inject(KafkaServerToken.consumer) private readonly consumer: Consumer) {}

    public async isHealthy(): Promise<KafkaServerHealth> {
        const indicator: KafkaServerHealth = {
            isHealthy: true,
            status: 'Stable',
        };
        try {
            const group = await this.consumer.describeGroup();

            indicator.isHealthy = this.success.has(group.state);
            indicator.status = group.state;
        }
        catch (error) {
            indicator.isHealthy = false;
            indicator.status = error instanceof Error
                ? error.message
                : String(error);
        }
        return indicator;
    }
}
