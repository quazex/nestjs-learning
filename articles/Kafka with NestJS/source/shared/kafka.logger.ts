import { Logger } from '@nestjs/common';
import { LogEntry, logLevel } from 'kafkajs';

export class KafkaLogger extends Logger {
    public static init() {
        return (entry: LogEntry): void => {
            switch (entry.level) {
                case logLevel.ERROR:
                    this.error(entry.log);
                    break;

                case logLevel.WARN:
                    this.warn(entry.log);
                    break;

                case logLevel.INFO:
                    this.log(entry.log);
                    break;

                default:
                    this.debug(entry.log);
                    break;
            }
        };
    }
}
