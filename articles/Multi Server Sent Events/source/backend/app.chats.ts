import { Injectable } from '@nestjs/common';
import { v6 as UUIDv6 } from 'uuid';
import { TUserChat } from './app.types';

@Injectable()
export class AppChats {
    private readonly chats: TUserChat[] = [];

    public login(): TUserChat {
        const [prev, latest] = this.chats.slice(-2);

        if (latest && prev && prev.roomId !== latest.roomId) {
            const next: TUserChat = {
                roomId: latest.roomId,
                userId: UUIDv6(),
            };
            this.chats.push(next);
            return next;
        }

        const next: TUserChat = {
            roomId: UUIDv6(),
            userId: UUIDv6(),
        };
        this.chats.push(next);
        return next;
    }

    public getParticipants(roomId: string): string[] {
        const chats = this.chats.filter((c) => c.roomId === roomId);
        return chats.map((c) => c.userId);
    }
}
