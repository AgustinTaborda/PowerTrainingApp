import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Inject } from '@nestjs/common';
import { PdfreportsService } from './pdfreports.service';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PDFToolkitService } from './pdfreports.tutorial';
import { PDFToolkitService2 } from './pdfreport.user.routines';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';



@ApiTags('REPORTS')
@Controller('pdfreports')
export class PdfreportsController {
  constructor(
    private readonly pdfreportsService: PdfreportsService,
    private readonly pdfToolkitService: PDFToolkitService,
    private readonly pdfToolkitService2: PDFToolkitService2,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
   

  ) {}

  @ApiOperation({ summary: 'Customers report PDF, downloads a reports directly' })
  @Get('/pdfCustomersAttached')
  async getPDF(
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.pdfreportsService.generatePDF()

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }
  @ApiOperation({ summary: 'Customers report PDF, it´s opens in browser directly' })
  @Get('/pdfCustomersInline')
  async getPDFinline(
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.pdfreportsService.generatePDF()

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }
  // FUENTE https://firxworx.com/blog/code/nestjs-generate-pdf-with-pdfkit-and-send-to-client/
 
  @ApiOperation({ summary: 'Customers report PDF, it´s opens in browser directly' })
  @Get('/pdfExample')
  async getpdftutorial(
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.pdfToolkitService.generarPDF()  
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=example.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }

  
  @ApiOperation({ summary: 'User PDF report , attached format, @Param = email' })
  @Get('userroutine/pdf')
  async getpdfUserroutine(@Param('email') email: string,
    @Res() res: Response,
  ): Promise<void> {
    const user : UserEntity = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: ['routines', 'routines.trainingDays', 'routines.trainingDays.exercises', 'routines.trainingDays.exercises.exercise'],
    
    })
    const buffer = await this.pdfToolkitService2.generarPDF(user)  
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=PowerTrainingUserRoutines.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }



  @ApiOperation({ summary: 'Reporte de rutinas activas de los usuarios para admins en PDF' })
  // @Roles('admin') 
  // @UseGuards(RolesGuard)
  @Get('/active-routines')
  async getActiveRoutinesPDF(@Res() res: Response): Promise<void> {
    const buffer = await this.pdfreportsService.generateActiveRoutinesPDF();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=active_routines.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }


}
