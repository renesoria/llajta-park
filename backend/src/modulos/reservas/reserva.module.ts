import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './reserva.entity';
import { ReservasController } from './reserva.controller';
import { ReservasService } from './reserva.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
