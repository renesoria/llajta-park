import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parqueo } from './parqueo.entity';
import { ParqueosController } from './parqueo.controller';
import { ParqueosService } from './parqueo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parqueo])],
  controllers: [ParqueosController],
  providers: [ParqueosService],
})
export class ParqueosModule {}