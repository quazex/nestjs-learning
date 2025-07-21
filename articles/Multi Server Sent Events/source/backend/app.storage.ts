import { Injectable } from '@nestjs/common';
import { TChatMessage } from './app.types';

@Injectable()
export class AppStorage {
    private readonly storage = new Map<string, TChatMessage[]>();

    public getList(roomId: string): TChatMessage[] {
        const room = this.storage.get(roomId) ?? [];
        return room;
    }

    public save(roomId: string, message: TChatMessage): void {
        const room = this.storage.get(roomId) ?? [];
        this.storage.set(roomId, room.concat(message));
    }
}
