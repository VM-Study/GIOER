import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { EXTENSION_CONSTANT } from '../entity/extension.constant';

export class UpdateExtensionDto {
  @IsOptional()
  @IsString()
  @Length(EXTENSION_CONSTANT.TITLE.MIN, EXTENSION_CONSTANT.TITLE.MAX)
  @ApiPropertyOptional({
    example: 'My Updated Extension',
    description: 'The title of the extension',
    minLength: EXTENSION_CONSTANT.TITLE.MIN,
    maxLength: EXTENSION_CONSTANT.TITLE.MAX,
  })
  public title?: string;

  @IsOptional()
  @IsString()
  @Length(
    EXTENSION_CONSTANT.DESCRIPTION.MIN,
    EXTENSION_CONSTANT.DESCRIPTION.MAX,
  )
  @ApiPropertyOptional({
    example: 'Updated description of the extension.',
    description: 'The description of the extension',
    minLength: EXTENSION_CONSTANT.DESCRIPTION.MIN,
    maxLength: EXTENSION_CONSTANT.DESCRIPTION.MAX,
  })
  public description?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Utilities',
    description: 'The category of the extension',
  })
  public category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    example: ['tool', 'automation'],
    description: 'An array of tags associated with the extension',
    type: [String],
  })
  public tags?: string[];

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    example: false,
    description: 'Flag indicating if the extension is archived',
  })
  public archived?: boolean;
}
