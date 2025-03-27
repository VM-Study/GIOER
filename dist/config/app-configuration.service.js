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
exports.AppConfiguration = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfiguration = class AppConfiguration {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    get appPort() {
        return this.configService.get('APP_PORT');
    }
    get appPasswordSaltRounds() {
        return this.configService.get('APP_PASSWORD_SALT_ROUNDS');
    }
    get mongoDb() {
        return this.configService.get('MONGO_DB');
    }
    get mongoHost() {
        return this.configService.get('MONGO_HOST');
    }
    get mongoPort() {
        return this.configService.get('MONGO_PORT');
    }
    get mongoUser() {
        return this.configService.get('MONGO_USER');
    }
    get mongoPassword() {
        return this.configService.get('MONGO_PASSWORD');
    }
    get mongoAuthBase() {
        return this.configService.get('MONGO_AUTH_BASE');
    }
    get accessTokenSecret() {
        return this.configService.get('JWT_ACCESS_TOKEN_SECRET');
    }
    get accessTokenExpiresIn() {
        return this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN');
    }
};
exports.AppConfiguration = AppConfiguration;
exports.AppConfiguration = AppConfiguration = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppConfiguration);
//# sourceMappingURL=app-configuration.service.js.map