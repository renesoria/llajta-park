import { Controller } from '@nestjs/common';
import { ParqueosService } from './parqueo.service';

@Controller('parqueos')
export class ParqueosController {
  constructor(private readonly parqueosService: ParqueosService) {}
}
