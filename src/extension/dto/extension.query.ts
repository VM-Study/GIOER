import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ExtensionSortType } from '../extension-sort-type.enum';
import { SortDirection } from '../../type/sort-direction.interface';
import { Type } from 'class-transformer';

export class ExtensionQuery {
  @ApiPropertyOptional({
    description: 'Page number of the extensions pagination',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  public page?: number;

  @ApiPropertyOptional({
    description: 'Limit the number of extensions returned',
    type: Number,
    example: 10,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  public limit?: number;

  @ApiPropertyOptional({
    description: 'Full-text search query (title, description)',
    example: 'productivity',
  })
  @IsOptional()
  @IsString()
  public query?: string;

  @ApiPropertyOptional({
    description: 'Filter by category (e.g., plugins, themes, brushes)',
    example: 'plugins',
  })
  @IsOptional()
  @IsString()
  public category?: string;

  @ApiPropertyOptional({
    description: 'Filter by upload date (YYYY-MM-DD)',
    example: '2024-03-27',
  })
  @IsOptional()
  @IsDateString()
  public uploadDate?: string;

  @ApiPropertyOptional({
    description: 'Filter by tags',
    example: ['tool', 'automation'],
    type: [String],
  })
  @IsOptional()
  @IsString({ each: true })
  public tags?: string[];

  @ApiPropertyOptional({
    description: 'Filter by author name',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  public author?: string;

  @ApiPropertyOptional({
    description: 'Field for sorting results',
    enum: ExtensionSortType,
    example: ExtensionSortType.BY_RATING,
  })
  @IsOptional()
  @IsEnum(ExtensionSortType)
  public sortField?: ExtensionSortType;

  @ApiPropertyOptional({
    description: 'Sorting direction (asc or desc)',
    enum: SortDirection,
    example: SortDirection.ASC,
  })
  @IsOptional()
  @IsEnum(SortDirection)
  public sortOrder?: SortDirection;
}
