import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ExtensionDto } from './extension.dto';

export class ExtensionPaginationDto {
  @Expose()
  @ApiProperty({
    description: 'Array of Extensions entities',
    type: [ExtensionDto],
  })
  public entities: ExtensionDto[];

  @Expose()
  @ApiProperty({
    description: 'Total number of available pages',
    example: 5,
  })
  public totalPages: number;

  @Expose()
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  public currentPage: number;

  @Expose()
  @ApiProperty({
    description: 'Total number of Extensions across all pages',
    example: 50,
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: 'Number of Extensions per page',
    example: 10,
  })
  public itemsPerPage: number;
}
