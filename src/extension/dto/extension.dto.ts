import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ExtensionDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the extension',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    example: 'My Extension',
    description: 'The title of the extension',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    example: 'This extension provides awesome productivity features.',
    description: 'The description of the extension',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    example: 'Productivity',
    description: 'The category of the extension',
  })
  @Expose()
  public category: string;

  @ApiProperty({
    example: ['tool', 'automation'],
    description: 'Tags associated with the extension',
    type: [String],
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    example: '60d0fe4f5311236168a109cb',
    description: 'The unique identifier of the author',
  })
  @Expose()
  @Transform(({ obj }) => obj.author?._id.toString())
  public authorId: string;

  @ApiProperty({
    example: '67efee88ae12078de2411ae5',
    description: 'The unique identifier of the file',
  })
  @Expose()
  public fileId: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the author',
  })
  @Expose()
  @Transform(({ obj }) => obj.author?.name)
  public author: string;

  @ApiProperty({
    example: '2024-03-27T12:34:56.000Z',
    description: 'The date when the extension was uploaded',
  })
  @Expose()
  public uploadDate: string;

  @ApiProperty({
    example: 4.5,
    description: 'The average rating of the extension',
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    example: 1234,
    description: 'The number of times the extension has been downloaded',
  })
  @Expose()
  public downloadCount: number;

  @ApiProperty({
    example: false,
    description: 'Indicates whether the extension is archived',
  })
  @Expose()
  public archived: boolean;
}
