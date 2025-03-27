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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongo_id_validation_pipe_1 = require("../database/mongo-id-validation.pipe");
const get_user_decorator_1 = require("../decorator/get-user.decorator");
const common_2 = require("../lib/common");
const create_user_dto_1 = require("../type/user/dto/create-user.dto");
const logged_dto_1 = require("../type/user/dto/logged.dto");
const login_dto_1 = require("../type/user/dto/login.dto");
const update_user_dto_1 = require("../type/user/dto/update-user.dto");
const user_dto_1 = require("../type/user/dto/user.dto");
const jwt_auth_guard_1 = require("./authentication/jwt-auth.guard");
const local_auth_guard_1 = require("./authentication/local-auth.guard");
const user_service_1 = require("./user.service");
let UserController = UserController_1 = class UserController {
    userService;
    logger = new common_1.Logger(UserController_1.name);
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(dto) {
        this.logger.log(`Creating new user with email: '${dto.email}'`);
        const createdUser = await this.userService.createUser(dto);
        return (0, common_2.fillDto)(user_dto_1.UserDto, createdUser.toPOJO());
    }
    async getUserById(userId) {
        this.logger.log(`Retrieving user with ID: '${userId}'`);
        const foundUser = await this.userService.findUserById(userId);
        return (0, common_2.fillDto)(user_dto_1.UserDto, foundUser.toPOJO());
    }
    async getUser(userId) {
        this.logger.log(`Retrieving current user with ID: '${userId}'`);
        const foundUser = await this.userService.findUserById(userId);
        return (0, common_2.fillDto)(user_dto_1.UserDto, foundUser.toPOJO());
    }
    async updateUser(userId, dto) {
        this.logger.log(`Updating user with ID '${userId}'`);
        const updatedUser = await this.userService.updateUserById(userId, dto);
        return (0, common_2.fillDto)(user_dto_1.UserDto, updatedUser.toPOJO());
    }
    async deleteUser(userId) {
        this.logger.log(`Attempting to delete user with ID: ${userId}`);
        const deletedUser = await this.userService.deleteUserById(userId);
        this.logger.log(`User deleted with ID: '${deletedUser.id}'`);
        return (0, common_2.fillDto)(user_dto_1.UserDto, deletedUser.toPOJO());
    }
    async login({ user }) {
        this.logger.log(`User logged in successfully: ${user.email}`);
        const userToken = await this.userService.createUserToken(user);
        return (0, common_2.fillDto)(logged_dto_1.LoggedDto, { ...userToken, ...user.toPOJO() });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The user has been successfully created.',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user has been successfully retrieved.',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    __param(0, (0, common_1.Param)('userId', mongo_id_validation_pipe_1.MongoIdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The current user has been successfully retrieved.',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Current user not found.' }),
    __param(0, (0, get_user_decorator_1.GetUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user has been successfully updated.',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    __param(0, (0, get_user_decorator_1.GetUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The user has been successfully deleted.',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
    __param(0, (0, get_user_decorator_1.GetUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Log in a user' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Login successful',
        type: login_dto_1.LoginDto
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'User password is empty'
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'User password is wrong'
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map