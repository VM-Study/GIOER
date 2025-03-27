import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { USER_CONSTANT } from '../entity/user.constant';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  public email: string;

  @IsString()
  @Length(USER_CONSTANT.NAME.MIN, USER_CONSTANT.NAME.MAX)
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    minLength: USER_CONSTANT.NAME.MIN,
    maxLength: USER_CONSTANT.NAME.MAX,
  })
  public name: string;

  @IsString()
  @Length(USER_CONSTANT.PASSWORD.MIN, USER_CONSTANT.PASSWORD.MAX)
  @ApiProperty({
    example: '123456',
    description: 'The password of the user',
    minLength: USER_CONSTANT.PASSWORD.MIN,
    maxLength: USER_CONSTANT.PASSWORD.MAX,
  })
  public password: string;
}
