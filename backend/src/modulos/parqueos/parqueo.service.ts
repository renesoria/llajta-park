import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parqueo } from './parqueo.entity';

@Injectable()
export class ParqueosService {
  constructor(
    @InjectRepository(Parqueo)
    private parqueosRepository: Repository<Parqueo>,
  ) {}
}