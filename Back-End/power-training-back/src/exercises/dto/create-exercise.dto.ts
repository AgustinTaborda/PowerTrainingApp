import { ApiProperty } from "@nestjs/swagger";

export class CreateExerciseDto {
    @ApiProperty({
        description: 'Nombre del ejercicio.',
        example: 'Tricep con Polea'
    })
    name: string;

    @ApiProperty({
        description: 'Descripcion del ejercicio.',
        example: 'Inclínate ligeramente hacia delante, exhala y empuja la barra hacia abajo utilizando solo los tríceps hasta que la barra llegue a la altura de la cadera y la parte superior del muslo.'
    })
    description: string;

    @ApiProperty({
        description: 'URL del video demostrativo.',
        example: 'https://www.youtube.com/watch?v=1YSqh2saQi0'
    })
    urlVideoExample: string;

    @ApiProperty({
        description: 'Beneficios del ejercicio',
        example: 'Trabaja triceps'
    })
    benefits: string;

    @ApiProperty({
        description: 'Palabras clave que identifiquen el ejercicio',
        example: 'Triceps Polea'
    })
    tags: string;
}
