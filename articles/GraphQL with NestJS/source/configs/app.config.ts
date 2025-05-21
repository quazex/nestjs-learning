import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { InjectEnvironment } from './config.decorator';
import { IDotenv } from './config.types';

@Injectable()
export class AppConfig {
    public readonly name: string;
    public readonly port: number;
    public readonly production: boolean;
    public readonly timezone: string;

    constructor(@InjectEnvironment() env: IDotenv) {
        this.name = env.get('APP_HOST').required().asString();
        this.port = env.get('APP_PORT').required().asPortNumber();
        this.production = env.get('APP_PRODUCTION').required().asBoolStrict();
        this.timezone = env.get('APP_TIMEZONE').required().asString();
    }

    public get now(): DateTime {
        return DateTime.local({ zone: this.timezone });
    }
}
