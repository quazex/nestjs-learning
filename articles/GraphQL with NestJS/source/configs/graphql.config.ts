import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GraphqlConfig implements GqlOptionsFactory {
    public createGqlOptions(): Omit<GqlModuleOptions, 'driver'> {
        return {
            autoSchemaFile: true,
            introspection: true,
        };
    }
}
