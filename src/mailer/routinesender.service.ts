import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { Inject } from "@nestjs/common";
import { MailService } from "./mailer.service";

export class notificationSender{
    mailService = new MailService();
    constructor(
        // @Inject(MailService) private mailService: MailService
    ){}

async receiveRoutineByemail(user: UserEntity) {
   /* const user = await this.userRepository.findOne({
       where: { email: email },
      relations: ['routines', 'routines.trainingDays', 'routines.trainingDays.exercises', 'routines.trainingDays.exercises.exercise'],
      }); */   
      try {
        const userRoutine = user.routines[0]; // Tomamos la primera rutina del usuario
let bodyHtml = `
  <p>Estimado cliente <strong>${user.name}</strong>,</p>
  <p>Su rutina semanal <strong>"${userRoutine.name}"</strong> con la descripción <em>"${userRoutine.description}"</em> consta de <strong>${userRoutine.trainingDays.length} días de ejercicios</strong>.</p>
  <h3>Detalles de la rutina:</h3>
  <ul>
`;

// Recorremos los días de entrenamiento para agregar detalles de cada día y sus ejercicios
userRoutine.trainingDays.forEach((day, index) => {
  bodyHtml += `
    <li>
      <h4>Día ${index + 1} (${day.date}): ${day.description}</h4>
      <ul>
  `;

  day.exercises.forEach((exercise) => {
    bodyHtml += `
      <li>
        <p><strong>Ejercicio:</strong> ${exercise.exercise.name}</p>
        <p><strong>Series:</strong> ${exercise.series}, <strong>Repeticiones:</strong> ${exercise.repetitions}, <strong>Peso:</strong> ${exercise.weight}kg</p>
      </li>
    `;
  });

  bodyHtml += `
      </ul>
    </li>
  `;
});

bodyHtml += `
  </ul>
  <p>¡Buena suerte con tus entrenamientos!</p>
  <p>Atentamente,<br>el equipo PowerTraining</p>
`;

//console.log(bodyHtml);

// Envía el email con el cuerpo en formato HTML
await this.mailService.sendEmail(user.email, 'Envío de rutina semanal', bodyHtml);
return user;
        
      } catch (error) {
        return {
          message: 'Email not sent',
          error: error.message};
        }
      }
     
    }
  