import { Field, ObjectType } from '@nestjs/graphql';
import { TActorListModel } from '../../../types/model.types';

@ObjectType()
export class ActorModelSchema implements TActorListModel {
    @Field()
    public id: number;

    @Field()
    public name: string;

    @Field()
    public films: number;
}
