import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

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

  @Column({ type: 'int' })
  capacidadTotal: number;

  @Column({ type: 'int', default: 0 })
  ocupadosManual: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioHora: number;

  @Column({ nullable: true })
  imagenUrl: string;

  @Column({ default: false })
  esAprobado: boolean;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'duenoId', referencedColumnName: 'id' })
  dueno: Usuario;

  @Column()
  duenoId: string;
}