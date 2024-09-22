import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(@Req() req : Request): string {
    console.log('El estado del login en app.controller.ts es '+ req.oidc.isAuthenticated());
    return JSON.stringify(req.oidc.user);
   
  }
}
