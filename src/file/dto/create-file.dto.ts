import { ApiProperty } from '@nestjs/swagger';
import { IsArray, isString, IsString, Length } from 'class-validator';

export class CreateFileDto{
    // @IsString()
    // @ApiProperty({
    //     example: 'My File',
    //     description: 'The title of the file uploaded for an extension',
    // })
    public extensionID: string
}