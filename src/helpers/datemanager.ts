import { Injectable } from '@nestjs/common';
import { PeriodType } from '../notificationschedule/entities/notificationschedule.entity';
import { throwError } from 'rxjs';
@Injectable()
export class DateManager{

 calculateNextSendDate =  (periodParam:string,period:PeriodType) =>{

      
    const hour = parseInt(periodParam.replaceAll('*','').slice(0,2));
    const minute = parseInt(periodParam.replaceAll('*','').slice(2,4));
    const date = new Date(2024, 10-1, 7, hour, minute, 0);
   
    const now = new Date();

    if (date < now) {
      console.log('La fecha ya paso')
      date.setDate(date.getDate() + 1);
      console.log(this.formatDateToLocalString(date))
    }else{

        console.log('La fecha todavia no paso')
        console.log(this.formatDateToLocalString(date))
    }


    console.log(this.formatDateToLocalString(date));
    return this.formatDateToLocalString(date);

  }

  

   formatDateToLocalString = (date) =>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11, sumamos 1
    const day = String(date.getDate()).padStart(2, '0');
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    const milliseconds = String(date.getMilliseconds()).padStart(6, '0'); // Añadimos ceros si es necesario
    
    // Construir el formato "YYYY-MM-DD HH:MM:SS.mmmmmm"
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  /**
   * 
   * @param hour 
   * @param minute 
   * @returns string 
   * @example if hour = 8 and minute = 00 then result will be '********0800'
   */
   encodeToHourSchedule = (hour : number,minute: number):string =>{

    if (hour > 23 || minute > 59 || hour < 0 || minute < 0) {
        throw new Error('Max hours to 23 and minutes to 59 and no negative numbers');
    }

    let parsedHour = hour.toString();
    let parsedMinute = minute.toString();
    const encoded:string = ''

    if(hour < 10){
        parsedHour = '0'+parsedHour;
    }
    if(minute < 10){
        parsedMinute = '0'+parsedMinute;
    }

    return '********'+parsedHour+parsedMinute;

  }

 

}

