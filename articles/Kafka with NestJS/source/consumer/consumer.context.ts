import { BaseRpcContext } from '@nestjs/microservices';
import { Batch } from 'kafkajs';
import { KafkaConsumerContextArgs } from './consumer.types';

export class KafkaConsumerContext<TData = unknown> extends BaseRpcContext<KafkaConsumerContextArgs<TData>> {
    /**
     * Get array of decoded messages
     * @returns Array of decoded messages
     */
    public getMessages(): TData[] {
        return this.args[0];
    }

    /**
     * Get Batch object provided by kafkajs
     * @link https://kafka.js.org/docs/consuming#a-name-each-message-a-eachmessage
     */
    public getBatch(): Batch {
        return this.args[1];
    }
}
