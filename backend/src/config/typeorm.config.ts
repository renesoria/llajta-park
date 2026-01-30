import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root', // Cambiar si tu usuario es diferente
  password: 'root_password', // Cambiar por tu contraseña
  database: 'llajta_park_db', // Nombre de la base de datos
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
  synchronize: true, // DEV-ONLY: Sincroniza el schema con la DB. No usar en producción.
};
