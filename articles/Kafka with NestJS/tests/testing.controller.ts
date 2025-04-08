import { Controller, UseInterceptors } from '@nestjs/common';
import { KafkaPattern, KafkaPayload } from '../source/consumer';
import { TestingClicksDto } from './testing.dto';
import { KafkaTestingInterceptor } from './testing.interceptor';
import { KafkaTestingRouting } from './testing.routing';
import { TestingClicks } from './testing.types';

@UseInterceptors(KafkaTestingInterceptor)
@Controller()
export class KafkaTestingController {
    public clicks: TestingClicks[] = [];

    @KafkaPattern(KafkaTestingRouting.clicks)
    public consumeClicks(@KafkaPayload(TestingClicksDto) messages: TestingClicks[]): void {
        this.clicks.push(...messages);
    }
}
