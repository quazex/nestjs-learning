import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, FilterQuery } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ActorEntity } from '../../../../business/database/entities/actor.entity';
import { ActorModel } from '../../../../business/domain/models/actor.model';
import { DatabaseConfig } from '../../../../configs/database.config';
import { TActorsListQuery } from '../../types/list.types';

@Injectable()
export class ActorsListDao {
    constructor(
        @InjectRepository(ActorEntity)
        private readonly repository: EntityRepository<ActorEntity>,
        private readonly databaseConfig: DatabaseConfig,
    ) {}

    public async find(query: TActorsListQuery): Promise<ActorModel[]> {
        const filter: FilterQuery<ActorEntity> = {
            actor_id: {
                $gte: 0,
            },
        };

        if (typeof query.cursor === 'number' && query.cursor > 0) {
            filter.actor_id = {
                $gte: query.cursor,
            };
        }

        const rows = await this.repository.find(filter, {
            limit: this.databaseConfig.limit + 1,
            orderBy: {
                actor_id: 'ASC',
            },
        });

        return rows.map((row) => ActorModel.fromEntity(row));
    }

    public async count(): Promise<number> {
        const total = await this.repository.count();
        return total;
    }
}
