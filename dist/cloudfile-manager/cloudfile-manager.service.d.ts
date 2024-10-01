import { UploadApiResponse } from 'cloudinary';
export declare class CloudfileManagerService {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
    uploadVideo(file: Express.Multer.File): Promise<UploadApiResponse>;
}
