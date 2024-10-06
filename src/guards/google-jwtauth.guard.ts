import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import * as jwkToPem from 'jwk-to-pem';

@Injectable()
export class CombinedAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
const isTest = false;

    if(isTest){


    const token = request.header('authorization')?.split(' ')[1] ?? '';

    if (!token) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // Intentar primero verificar si el token es un JWT propio (emitido por tu backend)
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = payload;
      return true;  // El token JWT fue verificado correctamente
    } catch (err) {
      console.log('No es un JWT válido, intentando Google...');
    }

    // Si el token no es válido para tu JWT, intentar verificarlo como un token de Google
    try {
      const decodedHeader = jwt.decode(token, { complete: true })?.header;
      const kid = decodedHeader?.kid;

      if (!kid) {
        throw new UnauthorizedException('Token inválido, no tiene kid');
      }

      const googleKeys = await this.getGooglePublicKeys();
      const jwk = googleKeys.keys.find(key => key.kid === kid);

      if (!jwk) {
        throw new UnauthorizedException('No se encontró la clave pública correspondiente');
      }

      const publicKey = jwkToPem(jwk);
      const decodedGoogleToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      
      request.user = decodedGoogleToken;
      return true;  // El token de Google fue verificado correctamente
    } catch (err) {
      console.log('Token inválido', err);
      throw new UnauthorizedException('Invalid token');
    }

  }else {
    return true;
  }
  }

  private async getGooglePublicKeys() {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/certs');
    return response.data;
  }
}
