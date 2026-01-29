import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepository: Repository<Vehiculo>,
  ) {}

  // Función para CREAR (Registrar)
  async create(createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo> {
    // 1. Crea la instancia del vehículo con los datos (incluyendo la categoría auto/moto)
    const nuevoVehiculo = this.vehiculoRepository.create(createVehiculoDto);

    // 2. Lo guarda en la base de datos
    return await this.vehiculoRepository.save(nuevoVehiculo);
  }

  // Función para VER TODOS
  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find();
  }
}
