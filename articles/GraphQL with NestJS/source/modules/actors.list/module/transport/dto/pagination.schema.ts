import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMetaSchema } from '../../../../../shared/schemas/pagination.schema';
import { TPaginationResult } from '../../../../../shared/types/pagination.types';
import { TActorListModel } from '../../../types/model.types';
import { ActorModelSchema } from './model.schema';

@ObjectType()
export class ActorPaginationSchema implements TPaginationResult<TActorListModel> {
    @Field(() => [ActorModelSchema])
    public items: ActorModelSchema[];

    @Field(() => PaginationMetaSchema)
    public meta: PaginationMetaSchema;
}
