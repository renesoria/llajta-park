import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
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

  @Column('decimal', { precision: 10, scale: 8, default: 0 })
  latitud: number;

  @Column('decimal', { precision: 10, scale: 8, default: 0 })
  longitud: number;

  // --- CAPACIDAD GRANULAR (Autos vs Motos) ---
  @Column({ type: 'int', default: 0 })
  capacidadAutos: number;

  @Column({ type: 'int', default: 0 })
  capacidadMotos: number;

  @Column({ type: 'int', default: 0 })
  ocupadosAutos: number;

  @Column({ type: 'int', default: 0 })
  ocupadosMotos: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioHora: number;

  // --- EXTRAS ---
  @Column('decimal', { precision: 2, scale: 1, default: 5.0 })
  rating: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

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