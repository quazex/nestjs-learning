import { Module } from '@nestjs/common';
import { AppChannels } from './app.channels';
import { AppChats } from './app.chats';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppStorage } from './app.storage';

@Module({
    controllers: [AppController],
    providers: [
        AppChannels,
        AppChats,
        AppStorage,
        AppService,
    ],
})
export class AppModule {}
