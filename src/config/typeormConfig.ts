import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

if (process.env.NODE_ENV !== 'production') {
  dotenvConfig({
    path: './.env',
  });
}

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  logging: false,//process.env.NODE_ENV !== 'production',
  dropSchema: false, //para recrear todas las tablas,
  ssl: process.env.NODE_ENV === 'local' ? { rejectUnauthorized: false } : false, // SSL solo en producción
};

export const connectionSource = new DataSource(config as DataSourceOptions);
export default registerAs('typeorm', () => config); // permite tener una "clave" que su valor es el objeto config
