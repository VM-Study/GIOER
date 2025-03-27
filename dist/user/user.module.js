"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const crypto_module_1 = require("../crypto/crypto.module");
const jwt_access_strategy_1 = require("./authentication/jwt-access.strategy");
const local_strategy_1 = require("./authentication/local.strategy");
const user_repository_1 = require("./entity/user.repository");
const user_schema_1 = require("./entity/user.schema");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.UserModel.name, schema: user_schema_1.UserSchema }]),
            crypto_module_1.CryptoModule,
            jwt_1.JwtModule.registerAsync(getJwtAsyncOptions()),
            config_1.ConfigModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, local_strategy_1.LocalStrategy, jwt_access_strategy_1.JwtAccessStrategy],
        exports: [user_service_1.UserService]
    })
], UserModule);
function getJwtAsyncOptions() {
    return {
        imports: [config_1.ConfigModule],
        useFactory: async (configService) => {
            return {
                secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
                signOptions: {
                    expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
                    algorithm: 'HS512'
                }
            };
        },
        inject: [config_1.ConfigService]
    };
}
//# sourceMappingURL=user.module.js.map