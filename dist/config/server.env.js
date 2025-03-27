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
exports.ServerEnvConfig = void 0;
exports.validate = validate;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ServerEnvConfig {
    APP_PORT;
    APP_PASSWORD_SALT_ROUNDS;
    MONGO_DB;
    MONGO_HOST;
    MONGO_PORT;
    MONGO_USER;
    MONGO_PASSWORD;
    MONGO_AUTH_BASE;
    JWT_ACCESS_TOKEN_SECRET;
    JWT_ACCESS_TOKEN_EXPIRES_IN;
}
exports.ServerEnvConfig = ServerEnvConfig;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ServerEnvConfig.prototype, "APP_PORT", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ServerEnvConfig.prototype, "APP_PASSWORD_SALT_ROUNDS", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServerEnvConfig.prototype, "MONGO_DB", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServerEnvConfig.prototype, "MONGO_HOST", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ServerEnvConfig.prototype, "MONGO_PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServerEnvConfig.prototype, "MONGO_USER", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServerEnvConfig.prototype, "MONGO_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServerEnvConfig.prototype, "MONGO_AUTH_BASE", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServerEnvConfig.prototype, "JWT_ACCESS_TOKEN_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServerEnvConfig.prototype, "JWT_ACCESS_TOKEN_EXPIRES_IN", void 0);
function validate(config) {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(ServerEnvConfig, config, {
        enableImplicitConversion: true
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
//# sourceMappingURL=server.env.js.map