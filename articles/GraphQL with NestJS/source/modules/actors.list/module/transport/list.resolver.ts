import { Args, Query, Resolver } from '@nestjs/graphql';
import { ActorsListService } from '../business/list.service';
import { ActorsListArgs } from './dto/args.schema';
import { ActorPaginationSchema } from './dto/pagination.schema';

@Resolver()
export class ActorsListResolver {
    constructor(private readonly service: ActorsListService) {}

    @Query(() => ActorPaginationSchema)
    public getList(@Args() query: ActorsListArgs): Promise<ActorPaginationSchema> {
        return this.service.getList(query);
    }
}
