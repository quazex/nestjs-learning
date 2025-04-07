import { Inject, Injectable } from '@nestjs/common';
import { Consumer, ConsumerGroupState } from 'kafkajs';
import { KafkaConsumerToken } from './consumer.tokens';
import { KafkaConsumerHealth } from './consumer.types';

@Injectable()
export class KafkaConsumerIndicator {
    private readonly success = new Set<ConsumerGroupState>([
        'PreparingRebalance',
        'CompletingRebalance',
        'Stable',
    ]);

    constructor(@Inject(KafkaConsumerToken.consumer) private readonly consumer: Consumer) {}

    public async isHealthy(): Promise<KafkaConsumerHealth> {
        const indicator: KafkaConsumerHealth = {
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
