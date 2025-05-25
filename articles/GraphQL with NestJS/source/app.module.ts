import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from './configs/config.module';
import { DatabaseConfig } from './configs/database.config';
import { GraphqlConfig } from './configs/graphql.config';
import { ActorsListModule } from './modules/actors.list/actors.module';
import { DateTimeScalar } from './shared/scalars/datetime.scalar';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MikroOrmModule.forRootAsync({
            useExisting: DatabaseConfig,
        }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useExisting: GraphqlConfig,
        }),
        ActorsListModule,
    ],
    providers: [
        DateTimeScalar,
    ],
})
export class AppModule {}
