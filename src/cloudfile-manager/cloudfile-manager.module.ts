import { Module } from '@nestjs/common';
import { CloudfileManagerService } from './cloudfile-manager.service';
import { CloudfileManagerController } from './cloudfile-manager.controller';
import { CloudinaryConfig } from '../config/cloudFileManager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudfileManager } from './entities/cloudfile-manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CloudfileManager])],
  controllers: [CloudfileManagerController],
  providers: [CloudfileManagerService, CloudinaryConfig],
})
export class CloudfileManagerModule {}
