import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root', 
  password: 'root_password', 
  database: 'llajta_park_db',
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
  synchronize: true, 
};
