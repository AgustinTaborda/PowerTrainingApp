import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import * as jwkToPem from 'jwk-to-pem';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
/*
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    // Obtener el header del token para extraer el `kid`
    const decodedHeader = jwt.decode(token, { complete: true })?.header;
    const kid = decodedHeader?.kid;

    if (!kid) {
      throw new UnauthorizedException('Token inválido, no tiene kid');
    }

    // Obtener las claves públicas de Google y encontrar la que coincide con el `kid`
    const googleKeys = await this.getGooglePublicKeys();
    const jwk = googleKeys.keys.find(key => key.kid === kid);

    if (!jwk) {
      throw new UnauthorizedException('No se encontró la clave pública correspondiente');
    }

    // Convertir JWK a PEM
    const publicKey = jwkToPem(jwk);

    try {
      // Verificar el token con la clave pública
      const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      console.log('Decoded token:', decoded);

      // Adjuntar el usuario decodificado al request
      request.user = decoded;
      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Token inválido');
    }
      */
    if(request.oidc.isAuthenticated()) {
      return true;
  }else{
      return false;
  }
  }

  private extractTokenFromRequest(request: Request): string | null {
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.split(' ')[1];
    }
    return null;
  }

  private async getGooglePublicKeys() {
    // Obtener las claves públicas de Google desde su endpoint de JWKS
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/certs');
    return response.data;
  }
}
