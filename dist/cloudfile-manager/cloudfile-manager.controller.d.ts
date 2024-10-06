import { CloudfileManagerService } from './cloudfile-manager.service';
export declare class CloudfileManagerController {
    private readonly cloudfileManagerService;
    constructor(cloudfileManagerService: CloudfileManagerService);
    uploadImages(file: Express.Multer.File): Promise<string>;
    uploadVideos(file: Express.Multer.File): Promise<string>;
    listVideos(): Promise<any>;
}
