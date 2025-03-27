"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
class UserFactory {
    static logger = new common_1.Logger(UserFactory.name);
    static createEntity(plainObject) {
        const plainObjectToLog = { ...plainObject };
        plainObjectToLog.password = '';
        this.logger.log(`Create user entity: '${JSON.stringify(plainObjectToLog)}'`);
        return new user_entity_1.UserEntity(plainObject);
    }
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=user.factory.js.map