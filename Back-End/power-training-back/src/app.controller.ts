import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get('/login')
  getHello(@Req() req: Request, @Res() res: Response) {
    return req.oidc.user
  }
  @Get('/logout')
  logoutFRomAuth0(@Req() req: Request, @Res() res: Response) {
    return req.oidc.user
  }

    
}
  
