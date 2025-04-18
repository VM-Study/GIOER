import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'The unique identifier of the user',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @Expose()
  public email: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Expose()
  public name: string;
}
