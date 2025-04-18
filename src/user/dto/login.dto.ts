import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user trying to log in.',
    example: 'user@example.com',
  })
  @IsString()
  public email: string;

  @ApiProperty({
    description: 'The password for the user account.',
    example: 'UserPassword123!',
  })
  @IsString()
  public password: string;
}
