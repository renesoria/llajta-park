import { Controller, Get } from '@nestjs/common';
import { ParqueoService } from './parqueo.service';

@Controller('parqueos')
export class ParqueoController {
  constructor(private readonly parqueoService: ParqueoService) {}

  @Get()
  findAll() {
    return this.parqueoService.findAll();
  }

  // Aquí se agregarán los demás endpoints del CRUD
}
