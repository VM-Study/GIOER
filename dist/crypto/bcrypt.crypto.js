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
var BcryptCrypto_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptCrypto = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
let BcryptCrypto = BcryptCrypto_1 = class BcryptCrypto {
    saltRounds;
    logger = new common_1.Logger(BcryptCrypto_1.name);
    constructor(saltRounds) {
        this.saltRounds = saltRounds;
    }
    async hashPassword(password) {
        this.logger.log(`Generating salt and hashing password`);
        const salt = await (0, bcrypt_1.genSalt)(this.saltRounds);
        return (0, bcrypt_1.hash)(password, salt);
    }
    async verifyPassword(inputPassword, storedHash) {
        this.logger.log(`Verifying password...`);
        return (0, bcrypt_1.compare)(inputPassword, storedHash);
    }
};
exports.BcryptCrypto = BcryptCrypto;
exports.BcryptCrypto = BcryptCrypto = BcryptCrypto_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Number])
], BcryptCrypto);
//# sourceMappingURL=bcrypt.crypto.js.map