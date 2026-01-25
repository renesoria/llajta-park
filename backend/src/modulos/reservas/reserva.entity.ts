import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fechaEntrada: Date;

  @Column({ nullable: true })
  fechaSalida: Date;

  @Column({ default: 'PENDIENTE' })
  estado: string;
}
