import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ActorEntity } from '../business/database/entities/actor.entity';
import { FilmEntity } from '../business/database/entities/film.entity';
import { FilmActorEntity } from '../business/database/entities/film_actor.entity';
import { LanguageEntity } from '../business/database/entities/language.entity';
import { InjectEnvironment } from './config.decorator';
import { IDotenv } from './config.types';

@Injectable()
export class DatabaseConfig implements MikroOrmOptionsFactory {
    public readonly limit: number;

    constructor(@InjectEnvironment() private readonly env: IDotenv) {
        this.limit = 40;
    }

    public createMikroOrmOptions(): MikroOrmModuleOptions {
        return {
            driver: PostgreSqlDriver,
            host: this.env.get('POSTGRESQL_HOST').required().asString(),
            port: this.env.get('POSTGRESQL_PORT').required().asPortNumber(),
            user: this.env.get('POSTGRESQL_USER').required().asString(),
            password: this.env.get('POSTGRESQL_PASSWORD').required().asString(),
            dbName: this.env.get('POSTGRESQL_DB').required().asString(),
            entities: [
                ActorEntity,
                FilmEntity,
                FilmActorEntity,
                LanguageEntity,
            ],
        };
    }
}
