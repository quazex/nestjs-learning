import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { DynamicModule, FactoryProvider } from '@nestjs/common';
import { parse } from 'dotenv';
import { from } from 'env-var';
import { AppConfig } from './app.config';
import { CONFIG_TOKEN } from './config.tokens';
import { GraphqlConfig } from './graphql.config';

export class ConfigModule {
    public static forRoot(): DynamicModule {
        const envProvider: FactoryProvider = {
            provide: CONFIG_TOKEN,
            useFactory: async(): Promise<unknown> => {
                const env = structuredClone(process.env);

                const root = process.cwd();
                const path = resolve(root, '.env');

                const isExists = existsSync(path);
                if (isExists) {
                    const raw = await readFile(path, 'utf8');
                    const dotenv = parse(raw);

                    Object.assign(process.env, dotenv);
                }

                return from(env);
            },
        };
        return {
            module: ConfigModule,
            global: true,
            providers: [AppConfig, GraphqlConfig, envProvider],
            exports: [AppConfig, GraphqlConfig],
        };
    }
}
