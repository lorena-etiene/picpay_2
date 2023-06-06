import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('saque')
export class Saque {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  valor!: number;

  @Column()
  data_hora!: Date;

  @Column()
  conta_id!: number;
}