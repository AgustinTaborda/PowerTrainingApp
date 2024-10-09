import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
<<<<<<< HEAD
import * as toStream from 'buffer-to-stream'; // acá en el video le puso import * as tostream from ...

@Injectable()
export class CloudfileManagerService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    console.log(file);

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'image', secure: true },

        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      toStream(file.buffer).pipe(upload); //si no se usa import * as toStream con * -> [Nest] 2360  - 04/08/2024, 01:52:24   ERROR [ExceptionsHandler] (0 , buffer_to_stream_1.default) is not a function
    });
=======
import * as toStream from 'buffer-to-stream' // acá en el video le puso import * as tostream from ... 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudfileManager } from './entities/cloudfile-manager.entity';

@Injectable()
export class CloudfileManagerService {
 async  databaseFiles() {
    return await this.cloudFileManagerRepository.find();
>>>>>>> ead6750540fb019b7c0ff3ac6f3401c21da547c6
  }

  constructor(@InjectRepository(CloudfileManager) private cloudFileManagerRepository: Repository<CloudfileManager>) {}
 
async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    console.log(file); // Para depuración: asegúrate de que el archivo se está recibiendo correctamente

    return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
            { resource_type: 'image' },
            async (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    try {
                        await this.saveToDatabase(result); // Espera a que se guarde en la base de datos
                        resolve(result); // Resuelve la promesa solo después de que se guarda
                    } catch (dbError) {
                        reject(dbError); // Rechaza si hay un error al guardar
                    }
                }
            },
        );

        toStream(file.buffer).pipe(upload); // Convierte el buffer a stream y lo sube
    });
}
  
  async uploadVideo(file: Express.Multer.File): Promise<UploadApiResponse> {
<<<<<<< HEAD
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'video', secure: true }, // Cambia el resource_type a 'video'
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      toStream(file.buffer).pipe(upload); // Convierte el buffer a stream y lo sube
    });
  }
}
=======
       
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                { resource_type: 'video' }, // Cambia el resource_type a 'video'
                async (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        await this.saveToDatabase(result);
                        resolve(result);
                       
                       
                    }
                },
            );
    
            toStream(file.buffer).pipe(upload); // Convierte el buffer a stream y lo sube
        });
    }

    async saveToDatabase(result: UploadApiResponse) {
        const cloudfileManager = new CloudfileManager();
        cloudfileManager.url = result.secure_url;
        cloudfileManager.fileType = result.resource_type;
        cloudfileManager.uploadedDate = new Date();
        cloudfileManager.publicId = result.public_id;
        this.cloudFileManagerRepository.create(cloudfileManager);
        await this.cloudFileManagerRepository.save(cloudfileManager);
    }
    
    async  listVideosFromCloudinary() {
        try {
            const result = await v2.api.resources({
                type: 'upload', // O 'upload' si solo quieres los videos subidos
                resource_type: 'video', // Filtra solo videos
               // max_results: 30, // Máximo de resultados a recuperar (puedes ajustar)
            });
            
            console.log(result); // Muestra todos los archivos
            return result.resources; // Retorna la lista de recursos (videos)
        } catch (error) {
            console.error('Error fetching videos:', error);
            throw error; // Propaga el error si es necesario
        }
    }
  
  }
>>>>>>> ead6750540fb019b7c0ff3ac6f3401c21da547c6
