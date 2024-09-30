// src/types/express.d.ts
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: any; // Define 'user' como cualquier tipo o un tipo específico si lo sabes
    token?: string; // También puedes extender con otras propiedades si es necesario
  }
}
