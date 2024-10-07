import { HttpException, HttpStatus } from "@nestjs/common";
import { DeleteResult } from "typeorm";

export class ErrorManager extends Error {
    constructor(message: string) {
        super(message);
    }

    deleteErrorManager(id: string|any, deleteresult: DeleteResult){
        if ( deleteresult.affected === 0) {
           throw new HttpException(`Message with ID ${id} not found`, HttpStatus.NOT_FOUND);
          } 
          return {statuscode:201,  message: 'Message deleted successfully'}

    }
}