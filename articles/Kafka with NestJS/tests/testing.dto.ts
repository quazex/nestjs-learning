import { IsInt, IsNotEmpty, IsPositive, IsString, IsUrl, IsUUID } from 'class-validator';
import { TestingClicks } from './testing.types';

export class TestingClicksDto implements TestingClicks {
    @IsUUID()
    public id: string;

    @IsUrl()
    public url: string;

    @IsString()
    @IsNotEmpty()
    public agent: string;

    @IsString()
    @IsNotEmpty()
    public email: string;

    @IsInt()
    @IsPositive()
    public timestamp: number;
}
