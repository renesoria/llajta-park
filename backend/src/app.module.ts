import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modulos/auth/auth.module';
import { UsuariosModule } from './modulos/usuarios/usuario.module';
import { ParqueoModule } from './modulos/parqueos/parqueo.module';
import { ReservasModule } from './modulos/reservas/reserva.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsuariosModule,
    ParqueoModule,
    ReservasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}