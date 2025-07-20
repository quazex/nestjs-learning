import { Injectable, OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import { Subject } from 'rxjs';
import { TChatMessage } from './app.types';

@Injectable()
export class AppChannels implements OnModuleDestroy {
    private readonly storage = new Map<string, Subject<TChatMessage>>();

    public onModuleDestroy() {
        for (const subject of this.storage.values()) {
            subject.unsubscribe();
        }
    }

    public getOrCreate(roomId: string): Subject<TChatMessage> {
        let channel = this.storage.get(roomId);
        if (!channel) {
            channel = new Subject()
            this.storage.set(roomId, channel)
        }
        return channel;
    }

    public remove(roomId: string): void {
        this.storage.delete(roomId);
    }
}
