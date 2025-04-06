import { BaseRpcContext } from '@nestjs/microservices';
import { Batch } from 'kafkajs';
import { KafkaServerContextArgs } from './server.types';

export class KafkaContext<TData = unknown> extends BaseRpcContext<KafkaServerContextArgs<TData>> {
    /**
     * Get array of decoded messages
     *
     * @returns Array of messages
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
