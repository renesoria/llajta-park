import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CrearUsuarioDto } from '../usuarios/dto/crear-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.authService.register(crearUsuarioDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.authService.login(loginUsuarioDto);
  }
}
