import { ApiProperty } from "@nestjs/swagger";

export class queryDto {

    @ApiProperty({example: 'SELECT * FROM exercises where tags like \'%cardio%\'', description: 'query to be executed in the database'})
   query : string
}