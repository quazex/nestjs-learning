import { IsUUID } from 'class-validator';

export class ChatParams {
    @IsUUID()
    public roomId: string;
}
