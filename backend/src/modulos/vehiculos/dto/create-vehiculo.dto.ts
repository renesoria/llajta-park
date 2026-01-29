import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { CategoriaVehiculo } from '../vehiculo.entity';

export class CreateVehiculoDto {
  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  // ESTO ES LO IMPORTANTE:
  @IsNotEmpty()
  @IsEnum(CategoriaVehiculo, {
    message: 'La categoría debe ser exactamente: auto o moto',
  })
  categoria: CategoriaVehiculo;

  // El usuarioId normalmente se saca del token, pero si lo estás enviando manual por ahora:
  @IsString()
  @IsNotEmpty()
  usuarioId: string;
}
