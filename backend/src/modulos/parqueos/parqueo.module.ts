import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parqueo } from './parqueo.entity';
import { ParqueoController } from './parqueo.controller';
import { ParqueoService } from './parqueo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parqueo])],
  controllers: [ParqueoController],
  providers: [ParqueoService],
})
export class ParqueoModule {}
