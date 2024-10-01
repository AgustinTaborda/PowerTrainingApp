"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../../users/dto/create-user.dto");
class CredentialsDto extends (0, swagger_1.PickType)(create_user_dto_1.CreateUserDto, ["email", "password"]) {
}
exports.CredentialsDto = CredentialsDto;
//# sourceMappingURL=credentials.dto.js.map