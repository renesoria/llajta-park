import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Reserva } from '../reservas/reserva.entity';

export enum CategoriaVehiculo {
  AUTO = 'auto',
  MOTO = 'moto',
}

@Entity({ name: 'vehicles' })
export class Vehiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  placa: string;

  @Column()
  modelo: string;

  @Column({
    type: 'enum',
    enum: CategoriaVehiculo,
  })
  categoria: CategoriaVehiculo;

  @ManyToOne(() => Usuario, (usuario) => usuario.vehiculos)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column()
  usuarioId: string;

  @OneToMany(() => Reserva, (reserva) => reserva.vehiculo)
  reservas: Reserva[];
}
