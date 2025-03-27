"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTPayload = createJWTPayload;
function createJWTPayload(user) {
    return {
        sub: user.id,
        email: user.email,
        name: user.name
    };
}
//# sourceMappingURL=jwt.js.map