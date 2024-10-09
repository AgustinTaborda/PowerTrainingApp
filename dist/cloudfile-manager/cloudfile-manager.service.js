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
exports.CloudfileManagerService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const toStream = require("buffer-to-stream");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cloudfile_manager_entity_1 = require("./entities/cloudfile-manager.entity");
let CloudfileManagerService = class CloudfileManagerService {
    async databaseFiles() {
        return await this.cloudFileManagerRepository.find();
    }
    constructor(cloudFileManagerRepository) {
        this.cloudFileManagerRepository = cloudFileManagerRepository;
    }
    async uploadImage(file) {
        console.log(file);
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    try {
                        await this.saveToDatabase(result);
                        resolve(result);
                    }
                    catch (dbError) {
                        reject(dbError);
                    }
                }
            });
            toStream(file.buffer).pipe(upload);
        });
    }
    async uploadVideo(file) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'video' }, async (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    await this.saveToDatabase(result);
                    resolve(result);
                }
            });
            toStream(file.buffer).pipe(upload);
        });
    }
    async saveToDatabase(result) {
        const cloudfileManager = new cloudfile_manager_entity_1.CloudfileManager();
        cloudfileManager.url = result.secure_url;
        cloudfileManager.fileType = result.resource_type;
        cloudfileManager.uploadedDate = new Date();
        cloudfileManager.publicId = result.public_id;
        this.cloudFileManagerRepository.create(cloudfileManager);
        await this.cloudFileManagerRepository.save(cloudfileManager);
    }
    async listVideosFromCloudinary() {
        try {
            const result = await cloudinary_1.v2.api.resources({
                type: 'upload',
                resource_type: 'video',
            });
            console.log(result);
            return result.resources;
        }
        catch (error) {
            console.error('Error fetching videos:', error);
            throw error;
        }
    }
};
exports.CloudfileManagerService = CloudfileManagerService;
exports.CloudfileManagerService = CloudfileManagerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cloudfile_manager_entity_1.CloudfileManager)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CloudfileManagerService);
//# sourceMappingURL=cloudfile-manager.service.js.map