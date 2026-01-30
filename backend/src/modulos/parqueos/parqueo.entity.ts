import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Entity({ name: 'parqueo' })
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

  @Column({ type: 'int' })
  capacidadAutos: number;

  @Column({ type: 'int' })
  capacidadMotos: number;

  @Column({ type: 'int', default: 0 })
  ocupadosAutos: number;

  @Column({ type: 'int', default: 0 })
  ocupadosMotos: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioHora: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ type: 'text', nullable: true })
  imagenUrl: string;

  @Column({ default: false })
  esAprobado: boolean;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'duenoId', referencedColumnName: 'id' })
  dueno: Usuario;

  @Column()
  duenoId: string;
}