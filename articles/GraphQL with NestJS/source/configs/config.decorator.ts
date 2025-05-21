import { Inject } from '@nestjs/common';
import { CONFIG_TOKEN } from './config.tokens';

export const InjectEnvironment = (): ReturnType<typeof Inject> => (
    Inject(CONFIG_TOKEN)
);
