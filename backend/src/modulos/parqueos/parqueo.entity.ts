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

@Entity({ name: 'parkings' })
export class Parqueo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitud: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitud: number;

  @Column('int')
  capacidadTotal: number;

  @Column('int', { default: 0 })
  ocupadosManual: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioHora: number;

  @Column({ nullable: true })
  imagenUrl: string;

  @Column({ default: false })
  esAprobado: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.parqueos)
  @JoinColumn({ name: 'duenoId' })
  dueno: Usuario;

  @Column()
  duenoId: string;

  @OneToMany(() => Reserva, (reserva) => reserva.parqueo)
  reservas: Reserva[];
}
