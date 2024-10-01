"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProgressDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_progress_dto_1 = require("./create-user-progress.dto");
class UpdateUserProgressDto extends (0, mapped_types_1.PartialType)(create_user_progress_dto_1.CreateUserProgressDto) {
}
exports.UpdateUserProgressDto = UpdateUserProgressDto;
//# sourceMappingURL=update-user-progress.dto.js.map