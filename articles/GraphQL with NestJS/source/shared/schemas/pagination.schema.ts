import { Field, ObjectType } from '@nestjs/graphql';
import { TPaginationMeta } from '../types/pagination.types';

@ObjectType()
export class PaginationMetaSchema implements TPaginationMeta {
    @Field({ nullable: true })
    public next?: number;

    @Field()
    public total: number;
}
