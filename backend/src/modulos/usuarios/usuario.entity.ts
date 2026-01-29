import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Vehiculo } from '../vehiculos/vehiculo.entity';
import { Parqueo } from '../parqueos/parqueo.entity';
import { Reserva } from '../reservas/reserva.entity';
import { Rol } from './enums/rol.enum';

@Entity({ name: 'users' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombreCompleto: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.CLIENTE,
  })
  rol: Rol;

  @CreateDateColumn({ type: 'timestamp' })
  fechaCreacion: Date;

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.usuario)
  vehiculos: Vehiculo[];

  @OneToMany(() => Parqueo, (parqueo) => parqueo.dueno)
  parqueos: Parqueo[];

  @OneToMany(() => Reserva, (reserva) => reserva.vehiculo)
  reservas: Reserva[];
}
