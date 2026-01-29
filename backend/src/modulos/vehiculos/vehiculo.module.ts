import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './vehiculo.entity';
import { VehiculoService } from './vehiculo.service'; // Tu servicio
import { VehiculosController } from './vehiculo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo])],
  controllers: [VehiculosController],
  providers: [VehiculoService],
  exports: [TypeOrmModule],
})
export class VehiculosModule {}
