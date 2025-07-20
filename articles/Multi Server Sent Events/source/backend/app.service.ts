import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { v6 as UUIDv6 } from 'uuid';
import { AppChannels } from './app.channels';
import { AppChats } from './app.chats';
import { AppStorage } from './app.storage';
import { TChatMessage, TChatSend, TUserChat } from './app.types';

@Injectable()
export class AppService {
    constructor(
        private readonly chats: AppChats,
        private readonly storage: AppStorage,
        private readonly channels: AppChannels,
    ) {}

    public login(): TUserChat {
        return this.chats.login();
    }

    public subscribe(roomId: string): Observable<TChatMessage> {
        const channel = this.channels.getOrCreate(roomId);
        return channel.asObservable();
    }

    public getHistory(roomId: string): TChatMessage[] {
        return this.storage.getList(roomId);
    }

    public send(payload: TChatSend): void {
        const channel = this.channels.getOrCreate(payload.roomId);

        const message: TChatMessage = {
            id: UUIDv6(),
            authorId: payload.authorId,
            text: payload.text,
            timestamp: Date.now(),
        };

        this.storage.save(payload.roomId, message);
        channel.next(message);
    }
}
