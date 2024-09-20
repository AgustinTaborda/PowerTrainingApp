import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ExerciseEntity } from './entities/exercise.entity'; 

@Injectable()
export class ExerciseSeed {
  constructor(private dataSource: DataSource) {}

  async seedExercises(): Promise<ExerciseEntity[]> {
    const exercises = [
      { name: 'Push-Up', description: 'Ejercicio de peso corporal para trabajar el pecho, tríceps y hombros.', urlVideoExample: 'https://www.example.com/push-up', benefits: 'Fortalece el tren superior, mejora la resistencia', tags: 'fuerza, pecho, tríceps' },
      { name: 'Pull-Up', description: 'Ejercicio de barra para desarrollar los músculos de la espalda y los bíceps.', urlVideoExample: 'https://www.example.com/pull-up', benefits: 'Aumenta la fuerza de espalda y brazos', tags: 'fuerza, espalda, bíceps' },
      { name: 'Squat', description: 'Sentadilla con peso o sin peso para trabajar los glúteos y cuádriceps.', urlVideoExample: 'https://www.example.com/squat', benefits: 'Fortalece piernas y glúteos, mejora la estabilidad', tags: 'fuerza, piernas, glúteos' },
      { name: 'Deadlift', description: 'Levantamiento de peso para trabajar la espalda baja y los glúteos.', urlVideoExample: 'https://www.example.com/deadlift', benefits: 'Desarrolla la fuerza total del cuerpo, mejora la postura', tags: 'fuerza, espalda, glúteos' },
      { name: 'Bench Press', description: 'Ejercicio con barra o mancuernas para desarrollar el pecho.', urlVideoExample: 'https://www.example.com/bench-press', benefits: 'Incrementa la fuerza en el pecho y los hombros', tags: 'fuerza, pecho, hombros' },
      { name: 'Lunges', description: 'Ejercicio de peso corporal o con peso para trabajar los cuádriceps y glúteos.', urlVideoExample: 'https://www.example.com/lunges', benefits: 'Fortalece piernas, mejora el equilibrio', tags: 'fuerza, piernas, glúteos' },
      { name: 'Plank', description: 'Ejercicio isométrico para fortalecer el core.', urlVideoExample: 'https://www.example.com/plank', benefits: 'Mejora la estabilidad del core, refuerza la postura', tags: 'core, abdominales, estabilidad' },
      { name: 'Overhead Press', description: 'Ejercicio con barra o mancuernas para desarrollar los hombros.', urlVideoExample: 'https://www.example.com/overhead-press', benefits: 'Fortalece hombros y mejora la estabilidad del core', tags: 'fuerza, hombros, core' },
      { name: 'Bicep Curl', description: 'Ejercicio con mancuernas o barra para desarrollar los bíceps.', urlVideoExample: 'https://www.example.com/bicep-curl', benefits: 'Aumenta la fuerza en los brazos', tags: 'fuerza, bíceps, brazos' },
      { name: 'Tricep Dips', description: 'Ejercicio de peso corporal para trabajar los tríceps.', urlVideoExample: 'https://www.example.com/tricep-dips', benefits: 'Fortalece los brazos y los hombros', tags: 'fuerza, tríceps, brazos' },
      { name: 'Lat Pulldown', description: 'Ejercicio en máquina para fortalecer la espalda.', urlVideoExample: 'https://www.example.com/lat-pulldown', benefits: 'Desarrolla los músculos de la espalda y los bíceps', tags: 'fuerza, espalda, bíceps' },
      { name: 'Leg Press', description: 'Ejercicio en máquina para trabajar los cuádriceps.', urlVideoExample: 'https://www.example.com/leg-press', benefits: 'Fortalece las piernas y los glúteos', tags: 'fuerza, piernas, glúteos' },
      { name: 'Calf Raise', description: 'Ejercicio de pie o en máquina para trabajar los gemelos.', urlVideoExample: 'https://www.example.com/calf-raise', benefits: 'Fortalece los gemelos y mejora la estabilidad', tags: 'piernas, gemelos, estabilidad' },
      { name: 'Dumbbell Row', description: 'Remo con mancuerna para trabajar la espalda y los bíceps.', urlVideoExample: 'https://www.example.com/dumbbell-row', benefits: 'Fortalece la espalda y mejora el equilibrio', tags: 'fuerza, espalda, bíceps' },
      { name: 'Russian Twist', description: 'Ejercicio con o sin peso para trabajar los oblicuos.', urlVideoExample: 'https://www.example.com/russian-twist', benefits: 'Fortalece el core, mejora la estabilidad lateral', tags: 'core, abdominales, oblicuos' },
      { name: 'Leg Curl', description: 'Ejercicio en máquina para trabajar los isquiotibiales.', urlVideoExample: 'https://www.example.com/leg-curl', benefits: 'Fortalece la parte posterior de las piernas', tags: 'fuerza, piernas, isquiotibiales' },
      { name: 'Shoulder Shrug', description: 'Encogimiento de hombros con mancuernas para desarrollar los trapecios.', urlVideoExample: 'https://www.example.com/shoulder-shrug', benefits: 'Fortalece los trapecios y mejora la postura', tags: 'fuerza, trapecios, hombros' },
      { name: 'Hip Thrust', description: 'Ejercicio con barra para trabajar los glúteos.', urlVideoExample: 'https://www.example.com/hip-thrust', benefits: 'Desarrolla los glúteos y fortalece el core', tags: 'fuerza, glúteos, core' },
      { name: 'Mountain Climber', description: 'Ejercicio cardiovascular que también trabaja el core.', urlVideoExample: 'https://www.example.com/mountain-climber', benefits: 'Mejora la resistencia cardiovascular, fortalece el core', tags: 'cardio, core, resistencia' },
      { name: 'Burpee', description: 'Ejercicio de cuerpo completo que combina una sentadilla con un salto.', urlVideoExample: 'https://www.example.com/burpee', benefits: 'Mejora la resistencia, quema calorías rápidamente', tags: 'cardio, fuerza, cuerpo completo' }
    ];

     await this.dataSource.getRepository(ExerciseEntity).save(exercises);
     return this.dataSource.getRepository(ExerciseEntity).find();

  }
}
