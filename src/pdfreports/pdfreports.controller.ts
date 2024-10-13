import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PdfreportsService } from './pdfreports.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('PDFREPORTS')
@Controller('pdfreports')
export class PdfreportsController {
  constructor(
    private readonly pdfreportsService: PdfreportsService
   

  ) {}

 
  @Get('/pdf')
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
  @Get('/pdfinline')
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
 

/*
  @Post()
  create(@Body() createPdfreportDto: CreatePdfreportDto) {
    return this.pdfreportsService.create(createPdfreportDto);
  }

  @Get()
  findAll() {
    return this.pdfreportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pdfreportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePdfreportDto: UpdatePdfreportDto) {
    return this.pdfreportsService.update(+id, updatePdfreportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pdfreportsService.remove(+id);
  }
  */
}
