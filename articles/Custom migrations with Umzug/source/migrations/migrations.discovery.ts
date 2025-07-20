import { Injectable } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { DuplicateError } from '../errors/duplicate.error';
import { HandlerError } from '../errors/handler.error';
import { MigrationParams } from '../typing/params.interfaces';
import { MigrationProvider } from '../typing/providers.interface';
import { UMZUG_METADATA_KEY } from './migrations.tokens';

@Injectable()
export class MigrationsDiscovery {
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly reflector: Reflector,
    ) {}

    public explore(): MigrationProvider[] {
        const providers: MigrationProvider[] = [];

        for (const provider of this.discoveryService.getProviders()) {
            const isClass = typeof provider.instance?.constructor === 'function';
            if (!isClass) {
                continue;
            }

            const params: MigrationParams = this.reflector.get(
                UMZUG_METADATA_KEY,
                provider.instance.constructor,
            );

            if (!params || params.skip) {
                continue;
            }

            if (
                typeof provider.instance.up !== 'function' ||
                typeof provider.instance.down !== 'function'
            ) {
                throw new HandlerError(
                    'Provider with @Migration() decorator should implement up() and down() methods',
                );
            }

            const isDuplicatedByName = providers.find(
                (p) => p.name === provider.name,
            );
            if (isDuplicatedByName) {
                throw new DuplicateError(
                    `You need to change name or alias for migration ${provider.name}`,
                );
            }

            providers.push({
                name: params.alias ?? provider.name,
                up: provider.instance.up.bind(provider.instance),
                down: provider.instance.down.bind(provider.instance),
                params,
            });
        }

        return providers.sort((a, b) => a.params.order - b.params.order);
    }
}
