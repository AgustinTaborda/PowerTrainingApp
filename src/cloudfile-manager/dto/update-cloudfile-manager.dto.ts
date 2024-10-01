import { PartialType } from '@nestjs/mapped-types';
import { CreateCloudfileManagerDto } from './create-cloudfile-manager.dto';

export class UpdateCloudfileManagerDto extends PartialType(CreateCloudfileManagerDto) {}
