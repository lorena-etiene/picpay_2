import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('deposito')
export class Deposito {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  valor!: number;

  @Column()
  data_hora!: Date;

  @Column()
  conda_id!: number;
}