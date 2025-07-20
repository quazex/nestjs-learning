import { DynamicModule, Logger, Type } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';

export class MigrationsFactory {
    public static async init(root: Type | DynamicModule): Promise<void> {
        const logger = new Logger('Migrations');

        await CommandFactory.run(root as Type, {
            logger: ['debug', 'error', 'fatal', 'log', 'verbose', 'warn'],
            serviceErrorHandler: (err) => logger.error(err),
        });
    }
}
