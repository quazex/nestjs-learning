import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min, IsOptional } from 'class-validator';
import { TActorsListQuery } from '../../../types/list.types';

@ArgsType()
export class ActorsListArgs implements TActorsListQuery {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @Min(1)
    public cursor?: number;
}
