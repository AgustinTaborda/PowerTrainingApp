import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream' // acá en el video le puso import * as tostream from ... 

@Injectable()
export class CloudfileManagerService {
  async uploadImage(file : Express.Multer.File): Promise<UploadApiResponse>{

        console.log(file);

    return new Promise((resolve,reject)=>{
      const upload = v2.uploader.upload_stream(
                       { resource_type: 'image'},

            (error,result)=>{

                      if(error){
                              reject(error);
                      } else {
                              resolve(result);
                      }
              },
      );

      toStream(file.buffer).pipe(upload);//si no se usa import * as toStream con * -> [Nest] 2360  - 04/08/2024, 01:52:24   ERROR [ExceptionsHandler] (0 , buffer_to_stream_1.default) is not a function
    });
  }
  async uploadVideo(file: Express.Multer.File): Promise<UploadApiResponse> {
       
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                { resource_type: 'video' }, // Cambia el resource_type a 'video'
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

    async  listVideos() {
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