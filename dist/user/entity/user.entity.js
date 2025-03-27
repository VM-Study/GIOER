"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const class_transformer_1 = require("class-transformer");
const entity_1 = require("../../base/entity");
class UserEntity extends entity_1.Entity {
    name;
    email;
    password;
    constructor(user) {
        super();
        this.fillUserData(user);
    }
    fillUserData(user) {
        if (!user) {
            return;
        }
        Object.assign(this, user);
    }
    toPOJO() {
        const { _id, ...rest } = (0, class_transformer_1.instanceToPlain)(this);
        return {
            ...rest,
            id: this.id
        };
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map