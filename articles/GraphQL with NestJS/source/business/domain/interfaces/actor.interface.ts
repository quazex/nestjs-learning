import { DateTime } from 'luxon';

export interface TActorModel {
    id: number;
    name: string;
    updated: DateTime;
}
