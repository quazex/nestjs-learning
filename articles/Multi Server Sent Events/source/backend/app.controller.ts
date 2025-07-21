import { Body, Controller, Get, Headers, HttpCode, HttpStatus, MessageEvent, Param, Post, Sse, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AppGuard } from './app.guard';
import { AppService } from './app.service';
import { TChatMessage, TUserChat } from './app.types';
import { ChatBody } from './dto.body';
import { ChatParams } from './dto.params';

@Controller()
export class AppController {
    constructor(private readonly service: AppService) {}

    @HttpCode(HttpStatus.OK)
    @Post('users/login')
    public login(): TUserChat {
        return this.service.login();
    }

    @UseGuards(AppGuard)
    @Get('chats/:roomId/history')
    public getHistory(@Param() params: ChatParams): TChatMessage[] {
        return this.service.getHistory(params.roomId);
    }

    @UseGuards(AppGuard)
    @Post('chats/:roomId/send')
    public sendMessage(
        @Headers('X-Auth') authorId: string,
        @Param() params: ChatParams,
        @Body() body: ChatBody,
    ): void {
        this.service.send({
            roomId: params.roomId,
            text: body.text,
            authorId,
        });
    }

    @UseGuards(AppGuard)
    @Sse('chats/:roomId/subscribe')
    public subscribe(@Param() params: ChatParams): Observable<MessageEvent> {
        return this.service.subscribe(params.roomId).pipe(
            map((value) => {
                return {
                    data: value,
                };
            }),
        );
    }
}
