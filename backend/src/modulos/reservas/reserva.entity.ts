import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Vehiculo } from '../vehiculos/vehiculo.entity';
import { Parqueo } from '../parqueos/parqueo.entity';
import { EstadoReserva } from './enums/estado-reserva.enum';

@Entity({ name: 'reservations' })
export class Reserva {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: EstadoReserva,
    default: EstadoReserva.PENDIENTE,
  })
  estado: EstadoReserva;

  @Column()
  fechaEntrada: Date;

  @Column({ nullable: true })
  fechaSalida: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  precioTotal: number;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.reservas)
  @JoinColumn({ name: 'vehiculoId' })
  vehiculo: Vehiculo;

  @Column()
  vehiculoId: string;

  @ManyToOne(() => Parqueo, (parqueo) => parqueo.reservas)
  @JoinColumn({ name: 'parqueoId' })
  parqueo: Parqueo;

  @Column()
  parqueoId: string;
}
