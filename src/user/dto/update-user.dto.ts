import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { USER_CONSTANT } from '../entity/user.constant';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  public email?: string;

  @IsOptional()
  @IsString()
  @Length(USER_CONSTANT.NAME.MIN, USER_CONSTANT.NAME.MAX)
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The name of the user',
    minLength: USER_CONSTANT.NAME.MIN,
    maxLength: USER_CONSTANT.NAME.MAX,
  })
  public name?: string;

  @IsOptional()
  @IsString()
  @Length(USER_CONSTANT.PASSWORD.MIN, USER_CONSTANT.PASSWORD.MAX)
  @ApiPropertyOptional({
    example: '123456',
    description: 'The password of the user',
    minLength: USER_CONSTANT.PASSWORD.MIN,
    maxLength: USER_CONSTANT.PASSWORD.MAX,
  })
  public password?: string;
}
