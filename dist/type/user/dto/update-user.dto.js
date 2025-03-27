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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_constant_1 = require("../../../user/entity/user.constant");
class UpdateUserDto {
    email;
    name;
    password;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiPropertyOptional)({
        example: 'user@example.com',
        description: 'The email of the user'
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(user_constant_1.USER.NAME.MIN, user_constant_1.USER.NAME.MAX),
    (0, swagger_1.ApiPropertyOptional)({
        example: 'John Doe',
        description: 'The name of the user',
        minLength: user_constant_1.USER.NAME.MIN,
        maxLength: user_constant_1.USER.NAME.MAX
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(user_constant_1.USER.PASSWORD.MIN, user_constant_1.USER.PASSWORD.MAX),
    (0, swagger_1.ApiProperty)({
        example: '123456',
        description: 'The password of the user',
        minLength: user_constant_1.USER.PASSWORD.MIN,
        maxLength: user_constant_1.USER.PASSWORD.MAX
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
//# sourceMappingURL=update-user.dto.js.map