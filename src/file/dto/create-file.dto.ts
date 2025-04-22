import { ApiProperty } from '@nestjs/swagger';
import { IsArray, isString, IsString, Length } from 'class-validator';

export class CreateFileDto{
  
    @ApiProperty({
        example: '60d0fe4f5311236168a109c',
        description: 'The unique identifier of the extension parent of the file',
    })
    public fileExtensionId: string
}