import { IsString, IsNotEmpty, IsEnum, IsObject, IsOptional } from 'class-validator';
import { Templates } from '../enums/template.enum';

export class sendEmailDto {
    @IsString()
    @IsNotEmpty()
    from: string; 

    @IsString()
    @IsNotEmpty()
    subjectEmail: string;

    @IsString()
    @IsNotEmpty()
    sendTo: string;

    @IsEnum(Templates)
    @IsNotEmpty()
    template: string;

    @IsObject()
    @IsOptional()
    params: any
}