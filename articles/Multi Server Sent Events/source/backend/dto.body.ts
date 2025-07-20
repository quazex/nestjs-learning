import { IsString, Length } from 'class-validator';

export class ChatBody {
    @IsString()
    @Length(1)
    public text: string;
}
