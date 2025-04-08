import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { KafkaConsumerContext } from '../source/consumer';

@Injectable()
export class KafkaTestingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(KafkaTestingInterceptor.name);

    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const startRequest = Date.now();

        const rpc = context.switchToRpc();
        const ctx = rpc.getContext<KafkaConsumerContext>();

        const msg = ctx.getMessages();
        const batch = ctx.getBatch();

        return next.handle().pipe(
            tap(() => {
                this.logger.log('Test consumer', {
                    topic: batch.topic,
                    count: msg.length,
                    duration: Date.now() - startRequest,
                });
            }),
        );
    }
}
