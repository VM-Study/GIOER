import { JwtService } from '@nestjs/jwt';
import { BcryptCrypto } from '../crypto/bcrypt.crypto';
import { Token } from '../type/token.interface';
import { CreateUserDto } from '../type/user/dto/create-user.dto';
import { LoginDto } from '../type/user/dto/login.dto';
import { UpdateUserDto } from '../type/user/dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './entity/user.repository';
export declare class UserService {
    private readonly userRepository;
    private readonly bcryptCrypto;
    private readonly jwtService;
    private readonly logger;
    constructor(userRepository: UserRepository, bcryptCrypto: BcryptCrypto, jwtService: JwtService);
    createUser(dto: CreateUserDto): Promise<UserEntity>;
    findUserById(userId: string): Promise<UserEntity>;
    updateUserById(userId: string, dto: UpdateUserDto): Promise<UserEntity>;
    deleteUserById(userId: string): Promise<UserEntity>;
    exists(userId: string): Promise<boolean>;
    createUserToken(user: UserEntity): Promise<Token>;
    verifyUser(dto: LoginDto): Promise<UserEntity>;
}
