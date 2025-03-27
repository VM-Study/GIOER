"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillDto = fillDto;
const class_transformer_1 = require("class-transformer");
function fillDto(DtoClass, plainObject, options) {
    return (0, class_transformer_1.plainToInstance)(DtoClass, plainObject, {
        excludeExtraneousValues: true,
        ...options
    });
}
//# sourceMappingURL=common.js.map