import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ActorEntity } from '../../business/database/entities/actor.entity';
import { ActorsListService } from './module/business/list.service';
import { ActorsListDao } from './module/integration/list.dao';
import { ActorsListResolver } from './module/transport/list.resolver';

@Module({
    imports: [
        MikroOrmModule.forFeature([
            ActorEntity,
        ]),
    ],
    providers: [
        ActorsListDao,
        ActorsListService,
        ActorsListResolver,
    ],
})
export class ActorsListModule {}
