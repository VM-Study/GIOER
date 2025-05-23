import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { GetUserId } from '../decorator/get-user.decorator';
import { fillDto } from '../lib/common';
import { JwtAuthGuard } from './authentication/jwt-auth.guard';
import { LocalAuthGuard } from './authentication/local-auth.guard';
import { RequestWithUser } from './authentication/request-with-user.interface';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoggedDto } from './dto/logged.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createUser(@Body() dto: CreateUserDto): Promise<UserDto> {
    this.logger.log(`Creating new user with email: '${dto.email}'`);
    const createdUser = await this.userService.createUser(dto);

    return fillDto(UserDto, createdUser.toPOJO());
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async getUserById(
    @Param('userId', MongoIdValidationPipe) userId: string,
  ): Promise<UserDto> {
    this.logger.log(`Retrieving user with ID: '${userId}'`);
    const foundUser = await this.userService.findUserById(userId);

    return fillDto(UserDto, foundUser.toPOJO());
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: 200,
    description: 'The current user has been successfully retrieved.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'Current user not found.' })
  public async getUser(@GetUserId() userId: string): Promise<UserDto> {
    this.logger.log(`Retrieving current user with ID: '${userId}'`);
    const foundUser = await this.userService.findUserById(userId);

    return fillDto(UserDto, foundUser.toPOJO());
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async updateUser(
    @GetUserId() userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDto> {
    this.logger.log(`Updating user with ID '${userId}'`);
    const updatedUser = await this.userService.updateUserById(userId, dto);

    return fillDto(UserDto, updatedUser.toPOJO());
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async deleteUser(@GetUserId() userId: string): Promise<UserDto> {
    this.logger.log(`Attempting to delete user with ID: ${userId}`);
    const deletedUser = await this.userService.deleteUserById(userId);
    this.logger.log(`User deleted with ID: '${deletedUser.id}'`);

    return fillDto(UserDto, deletedUser.toPOJO());
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
    type: LoginDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User password is empty',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User password is wrong',
  })
  public async login(@Req() { user }: RequestWithUser): Promise<LoggedDto> {
    this.logger.log(`User logged in successfully: ${user.email}`);
    const userToken = await this.userService.createUserToken(user);

    return fillDto(LoggedDto, { ...userToken, ...user.toPOJO() });
  }
}
