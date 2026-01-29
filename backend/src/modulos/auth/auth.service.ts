import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { CrearUsuarioDto } from '../usuarios/dto/crear-usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    crearUsuarioDto: CrearUsuarioDto,
  ): Promise<Omit<Usuario, 'password'>> {
    const { password, email, ...userData } = crearUsuarioDto;

    const existingUser = await this.usuarioRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usuarioRepository.create({
      ...userData,
      email,
      password: hashedPassword,
    });
    const savedUser = await this.usuarioRepository.save(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = savedUser;
    return result;
  }

  private async findOneByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { email },
      select: ['id', 'nombreCompleto', 'email', 'rol', 'password'],
    });
  }

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const { email, password } = loginUsuarioDto;
    const user = await this.findOneByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, sub: user.id, rol: user.rol };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nombre: user.nombreCompleto,
        rol: user.rol,
        email: user.email, // Add email here
      },
    };
  }
}
