import { Module } from '@nestjs/common';
import { CloudfileManagerService } from './cloudfile-manager.service';
import { CloudfileManagerController } from './cloudfile-manager.controller';
import { CloudinaryConfig } from '../config/cloudFileManager';

@Module({
  controllers: [CloudfileManagerController],
  providers: [CloudfileManagerService,CloudinaryConfig],
})
export class CloudfileManagerModule {}
