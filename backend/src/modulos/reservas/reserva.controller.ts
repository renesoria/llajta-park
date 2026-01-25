import { Controller } from '@nestjs/common';
import { ReservasService } from './reserva.service';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}
}