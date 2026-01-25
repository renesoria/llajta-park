import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Parqueo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  ubicacion: string;

  @Column('int')
  capacidad: number;

  @Column('decimal')
  precioHora: number;
}
