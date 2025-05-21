import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from './configs/config.module';
import { GraphqlConfig } from './configs/graphql.config';
import { DateTimeScalar } from './shared/scalars/datetime.scalar';

@Module({
    imports: [
        ConfigModule,
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useExisting: GraphqlConfig,
            imports: [ConfigModule],
        }),
    ],
    providers: [
        DateTimeScalar,
    ],
})
export class AppModule {}
