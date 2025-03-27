"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_crypto_1 = require("../crypto/bcrypt.crypto");
const jwt_2 = require("./authentication/jwt");
const user_factory_1 = require("./entity/user.factory");
const user_repository_1 = require("./entity/user.repository");
const user_constant_1 = require("./user.constant");
let UserService = UserService_1 = class UserService {
    userRepository;
    bcryptCrypto;
    jwtService;
    logger = new common_1.Logger(UserService_1.name);
    constructor(userRepository, bcryptCrypto, jwtService) {
        this.userRepository = userRepository;
        this.bcryptCrypto = bcryptCrypto;
        this.jwtService = jwtService;
    }
    async createUser(dto) {
        const { email, name, password } = dto;
        this.logger.log(`Attempting to create user with email: ${email}`);
        const existUser = await this.userRepository.findByEmail(email);
        if (existUser) {
            this.logger.warn(`User with email '${email}' already exists`);
            throw new common_1.ConflictException(user_constant_1.USER_EXISTS);
        }
        const hashPassword = await this.bcryptCrypto.hashPassword(password);
        const userData = {
            name: name,
            email: email,
            password: hashPassword
        };
        const userEntity = user_factory_1.UserFactory.createEntity(userData);
        const createdUser = await this.userRepository.save(userEntity);
        this.logger.log(`User created with ID: '${createdUser.id}'`);
        return createdUser;
    }
    async findUserById(userId) {
        this.logger.log(`Looking for user with ID: '${userId}'`);
        const foundUser = await this.userRepository.findById(userId);
        if (!foundUser) {
            this.logger.warn(`User not found with ID: '${userId}'`);
            throw new common_1.NotFoundException(user_constant_1.USER_NOT_FOUND);
        }
        return foundUser;
    }
    async updateUserById(userId, dto) {
        this.logger.log(`Updating user with ID: '${userId}'`);
        const updatedUser = await this.findUserById(userId);
        if (dto.name !== undefined)
            updatedUser.name = dto.name;
        if (dto.email !== undefined)
            updatedUser.email = dto.email;
        if (dto.password !== undefined)
            updatedUser.password = dto.password;
        return this.userRepository.update(userId, updatedUser);
    }
    async deleteUserById(userId) {
        this.logger.log(`Deleting user with ID: '${userId}'`);
        const foundUser = await this.userRepository.findById(userId);
        if (!foundUser) {
            this.logger.warn(`User not found with ID: '${userId}'`);
            throw new common_1.NotFoundException(user_constant_1.USER_NOT_FOUND);
        }
        const deletedUser = await this.userRepository.deleteById(userId);
        this.logger.log(`User with ID: '${userId}' deleted`);
        return deletedUser;
    }
    async exists(userId) {
        return this.userRepository.exists(userId);
    }
    async createUserToken(user) {
        this.logger.log(`Generating token for user ID: '${user.id}'`);
        const accessTokenPayload = (0, jwt_2.createJWTPayload)(user);
        try {
            const accessToken = await this.jwtService.signAsync(accessTokenPayload);
            this.logger.log(`Tokens generated successfully for user ID: '${user.id}'`);
            return { accessToken };
        }
        catch (error) {
            this.logger.error('[Tokens generation error]: ' + error.message);
            throw new common_1.HttpException('Tokens generation error.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyUser(dto) {
        this.logger.log(`Verifying user: ${dto.email}`);
        const { email, password } = dto;
        const existUser = await this.userRepository.findByEmail(email);
        if (!existUser) {
            this.logger.warn(`User not found with email: '${email}'`);
            throw new common_1.NotFoundException(user_constant_1.USER_NOT_FOUND);
        }
        const isPasswordCorrect = await this.bcryptCrypto.verifyPassword(password, existUser.password);
        if (!isPasswordCorrect) {
            this.logger.warn(`Incorrect password attempt for user: ${dto.email}`);
            throw new common_1.UnauthorizedException(user_constant_1.USER_AUTHENTICATION_PASSWORD_WRONG);
        }
        this.logger.log(`User verified: ${existUser.email}`);
        return existUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        bcrypt_crypto_1.BcryptCrypto,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map