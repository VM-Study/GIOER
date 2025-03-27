"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt_crypto_1 = require("./bcrypt.crypto");
let CryptoModule = class CryptoModule {
};
exports.CryptoModule = CryptoModule;
exports.CryptoModule = CryptoModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: bcrypt_crypto_1.BcryptCrypto,
                useFactory: (config) => {
                    const saltRounds = config.get('APP_PASSWORD_SALT_ROUNDS');
                    return new bcrypt_crypto_1.BcryptCrypto(saltRounds);
                },
                inject: [config_1.ConfigService]
            }
        ],
        exports: [bcrypt_crypto_1.BcryptCrypto]
    })
], CryptoModule);
//# sourceMappingURL=crypto.module.js.map