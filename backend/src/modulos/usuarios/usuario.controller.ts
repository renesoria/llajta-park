import { Controller } from '@nestjs/common';
import { UsuariosService } from './usuario.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
}
