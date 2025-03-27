import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, Length } from 'class-validator';
import { EXTENSION_CONSTANT } from '../entity/extension.constant';

export class CreateExtensionDto {
  @IsString()
  @Length(EXTENSION_CONSTANT.TITLE.MIN, EXTENSION_CONSTANT.TITLE.MAX)
  @ApiProperty({
    example: 'My Extension',
    description: 'The title of the extension',
    minLength: EXTENSION_CONSTANT.TITLE.MIN,
    maxLength: EXTENSION_CONSTANT.TITLE.MAX,
  })
  public title: string;

  @IsString()
  @Length(
    EXTENSION_CONSTANT.DESCRIPTION.MIN,
    EXTENSION_CONSTANT.DESCRIPTION.MAX,
  )
  @ApiProperty({
    example: 'This extension provides awesome productivity features.',
    description: 'The description of the extension',
    minLength: EXTENSION_CONSTANT.DESCRIPTION.MIN,
    maxLength: EXTENSION_CONSTANT.DESCRIPTION.MAX,
  })
  public description: string;

  @IsString()
  @ApiProperty({
    example: 'Productivity',
    description: 'The category of the extension',
  })
  public category: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ['tool', 'automation'],
    description: 'An array of tags associated with the extension',
    type: [String],
  })
  public tags: string[];
}
