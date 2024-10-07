import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CloudfileManagerService } from './cloudfile-manager.service';
//import { CreateCloudfileManagerDto } from './dto/create-cloudfile-manager.dto';
import { FileInterceptor } from '@nestjs/platform-express';
//import { AuthGuard } from '../guards/auth.guards';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/guards/jwtauth.guard';
import { CombinedAuthGuard } from 'src/guards/google-jwtauth.guard';


@ApiTags('FILES-MANAGER')
@ApiBearerAuth('access-token')
@UseGuards(CombinedAuthGuard) 
@Controller('files')
export class CloudfileManagerController {
  constructor(private readonly cloudfileManagerService: CloudfileManagerService) {

  }
  //@ApiBearerAuth() //para que swagger lea el token
  //@UseGuards(AuthGuard)//como no está en el constructor, no necesito inicializarlo en el module
  
  @Post('/uploadImage')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')  // Indica que se está manejando un formulario para subir archivos
  @ApiOperation({ summary: 'Subir un archivo' }) // Descripción de la operación
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { // Asegúrate de que el nombre coincida con el campo del interceptor
          type: 'string',
          format: 'binary',
        },
      },
    },
  })  
  async uploadImages(@UploadedFile() file: Express.Multer.File): Promise<string> { // Definición del tipo de retorno
    try {
      const response = await this.cloudfileManagerService.uploadImage(file);
      return response.url; // Retorna la URL de la imagen
    } catch (error) {
      // Manejo de errores: lanza una excepción si la carga falla
      throw new HttpException('Error uploading image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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

  @Get('/listVideos')
  @ApiOperation({ summary: 'Retrieve all videos from Cloudinary' }) 
  async listVideos(){
    return  await this.cloudfileManagerService.listVideosFromCloudinary();
  }

  @Get('/databaseFiles')
  @ApiOperation({
     summary: 'Retrieve all files stored in the database that you upload to cloudinary' ,
    description: 'When you upload a file to cloudinary, it is stored in the database. This endpoint retrieves all files stored in the database.'

    }) 

  async databaseFiles(){
    return  await this.cloudfileManagerService.databaseFiles();
  }
  

}

  


