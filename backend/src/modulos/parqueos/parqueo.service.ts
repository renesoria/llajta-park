import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parqueo } from './parqueo.entity';

@Injectable()
export class ParqueoService {
  constructor(
    @InjectRepository(Parqueo)
    private readonly parqueoRepository: Repository<Parqueo>,
  ) {}

  async findAll(): Promise<Parqueo[]> {
    return this.parqueoRepository.find();
  }

  // Aquí se agregarán los demás métodos del CRUD (create, findOne, update, delete)
}
