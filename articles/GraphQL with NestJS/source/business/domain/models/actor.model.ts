import { DateTime } from 'luxon';
import { ActorEntity } from '../../database/entities/actor.entity';
import { TActorModel } from '../interfaces/actor.interface';

export class ActorModel implements TActorModel {
    #actorId: number;
    #firstName: string;
    #lastName: string;
    #lastUpdated: DateTime;

    private constructor(
        id: number,
        firstName: string,
        lastName: string,
        updated: Date,
    ) {
        this.#actorId = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#lastUpdated = DateTime.fromJSDate(updated);
    }

    public get id(): number {
        return this.#actorId;
    }

    public get name(): string {
        return `${this.#lastName} ${this.#firstName}`;
    }

    public get updated(): DateTime {
        return this.#lastUpdated;
    }

    public static fromEntity(entity: ActorEntity): ActorModel {
        return new ActorModel(
            entity.actor_id,
            entity.first_name,
            entity.last_name,
            entity.last_updated,
        );
    }
}
