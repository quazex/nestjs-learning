import { Inject, Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { Umzug } from 'umzug';
import { CommandError } from '../errors/command.error';
import { MigrationsTemplate } from './migrations.template';
import { UMZUG_PROVIDER_KEY } from './migrations.tokens';

@Command({ name: 'migrate', description: 'Run migrations' })
export class MigrationsCommands extends CommandRunner {
    private readonly logger = new Logger('Migrations');

    constructor(@Inject(UMZUG_PROVIDER_KEY) private readonly client: Umzug) {
        super();
    }

    public async run(params: string[]): Promise<void> {
        const [command, ...args] = params;

        if (command === 'up') {
            const meta = await this.client.up();
            this.logger.log(`Successfully up ${meta.length} migrations`);
            return;
        }

        if (command === 'down' && args.length > 0) {
            const meta = await this.client.down();
            this.logger.log(`Successfully down ${meta.length} migrations`);
            return;
        }

        if (command === 'generate') {
            const filename = args.at(0) ?? 'migration';
            const timestamp = Date.now();

            await this.client.create({
                name: `${timestamp}.${filename}.ts`,
                prefix: 'NONE',
                allowExtension: '.ts',
                allowConfusingOrdering: false,
                skipVerify: true,
                content: await MigrationsTemplate.generate(timestamp),
            });
            return;
        }

        throw new CommandError('There is no command to run');
    }
}
