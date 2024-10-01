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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudfileManagerController = void 0;
const common_1 = require("@nestjs/common");
const cloudfile_manager_service_1 = require("./cloudfile-manager.service");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const google_jwtauth_guard_1 = require("../guards/google-jwtauth.guard");
let CloudfileManagerController = class CloudfileManagerController {
    constructor(cloudfileManagerService) {
        this.cloudfileManagerService = cloudfileManagerService;
    }
    async uploadImages(file) {
        console.log(file);
        return await this.cloudfileManagerService.uploadImage(file).then(response => response.url);
    }
    async uploadVideos(file) {
        if (!file) {
            throw new common_1.BadRequestException('No se ha subido ningún archivo');
        }
        if (file.size === 0) {
            throw new common_1.BadRequestException('El archivo está vacío');
        }
        return await this.cloudfileManagerService.uploadVideo(file).then(response => response.url);
    }
};
exports.CloudfileManagerController = CloudfileManagerController;
__decorate([
    (0, common_1.Post)('/uploadImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudfileManagerController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Post)('/uploadVideo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('video')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Subir un archivo' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                video: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudfileManagerController.prototype, "uploadVideos", null);
exports.CloudfileManagerController = CloudfileManagerController = __decorate([
    (0, swagger_1.ApiTags)('files'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(google_jwtauth_guard_1.CombinedAuthGuard),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [cloudfile_manager_service_1.CloudfileManagerService])
], CloudfileManagerController);
//# sourceMappingURL=cloudfile-manager.controller.js.map