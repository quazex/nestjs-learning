import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AppChats } from './app.chats';
import { ChatParams } from './dto.params';

@Injectable()
export class AppGuard implements CanActivate {
    constructor(private readonly chats: AppChats) {}

    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<FastifyRequest<{ Params: ChatParams, Querystring: { user: string } }>>();

        const roomId = request.params.roomId;
        const authorId = request.headers['x-author'] ?? request.query.user;

        if (typeof authorId !== 'string' || typeof roomId !== 'string') {
            throw new ForbiddenException();
        }

        const participants = this.chats.getParticipants(roomId);
        const isParticipant = participants.includes(authorId);

        return isParticipant;
    }
}
