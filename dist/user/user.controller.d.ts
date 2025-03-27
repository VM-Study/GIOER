import { CreateUserDto } from '../type/user/dto/create-user.dto';
import { LoggedDto } from '../type/user/dto/logged.dto';
import { UpdateUserDto } from '../type/user/dto/update-user.dto';
import { UserDto } from '../type/user/dto/user.dto';
import { RequestWithUser } from './authentication/request-with-user.interface';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    createUser(dto: CreateUserDto): Promise<UserDto>;
    getUserById(userId: string): Promise<UserDto>;
    getUser(userId: string): Promise<UserDto>;
    updateUser(userId: string, dto: UpdateUserDto): Promise<UserDto>;
    deleteUser(userId: string): Promise<UserDto>;
    login({ user }: RequestWithUser): Promise<LoggedDto>;
}
