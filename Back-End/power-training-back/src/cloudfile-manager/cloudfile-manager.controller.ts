import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, BadRequestException } from '@nestjs/common';
import { CloudfileManagerService } from './cloudfile-manager.service';
//import { CreateCloudfileManagerDto } from './dto/create-cloudfile-manager.dto';
import { FileInterceptor } from '@nestjs/platform-express';
//import { AuthGuard } from '../guards/auth.guards';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('files')
@Controller('files')
export class CloudfileManagerController {
  constructor(private readonly cloudfileManagerService: CloudfileManagerService) {

  }
  //@ApiBearerAuth() //para que swagger lea el token
  //@UseGuards(AuthGuard)//como no está en el constructor, no necesito inicializarlo en el module
  @Post('/uploadImage')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImages(@UploadedFile() file: Express.Multer.File){
    console.log(file);
    return  await this.cloudfileManagerService.uploadImage(file).then(response => response.url);
  }

  @Post('/uploadVideo')
  @UseInterceptors(FileInterceptor('video'))
  @ApiConsumes('multipart/form-data')  // Indica que se está manejando un formulario para subir archivos
  @ApiOperation({ summary: 'Subir un archivo' }) // Descripción de la operación
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        video: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })  
  async uploadVideos(@UploadedFile() file: Express.Multer.File){

    if (!file) {
      throw new BadRequestException('No se ha subido ningún archivo');
    }
    if (file.size === 0) {
      throw new BadRequestException('El archivo está vacío');
    }
    
    return  await this.cloudfileManagerService.uploadVideo(file).then(response => response.url);
  }
 
  }

  


