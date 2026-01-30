import { Controller, Post, Body, Get } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { Vehiculo } from './vehiculo.entity';

@Controller('vehiculos') // Esto define la ruta: localhost:3000/vehiculos
export class VehiculosController {
  // Inyectamos el servicio (la lógica)
  constructor(private readonly vehiculosService: VehiculoService) {}

  @Post()
  async create(
    @Body() createVehiculoDto: CreateVehiculoDto,
  ): Promise<Vehiculo> {
    // Aquí llega el dato, el DTO valida si es auto/moto, y se manda a guardar
    return await this.vehiculosService.create(createVehiculoDto);
  }

  // Opcional: Para ver todos los vehículos
  @Get()
  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculosService.findAll();
  }
}
