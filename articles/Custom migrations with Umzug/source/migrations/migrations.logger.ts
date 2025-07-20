import { Logger } from '@nestjs/common';
import { LogInfo, LogMessage } from '../typing/logger.interfaces';

export class MigrationsLogger {
    private readonly logger = new Logger('Migrations');

    public info(message: LogInfo): void {
        switch (message.event) {
            case 'migrating':
            case 'reverting':
                this.logger.log(`Start ${message.event} ${message.name}...`);
                break;

            case 'migrated':
            case 'reverted':
                this.logger.log(`Migration ${message.name} has been ${message.event}`);
                break;

            case 'created':
                this.logger.log(`File ${message.event} to ${message.path}`);
                break;

            default:
                this.logger.log(message.event);
        }
    }

    public warn(message: LogMessage): void {
        this.logger.warn(message);
    }

    public error(message: LogMessage): void {
        this.logger.error(message);
    }

    public debug(message: LogMessage): void {
        this.logger.debug(message);
    }
}
