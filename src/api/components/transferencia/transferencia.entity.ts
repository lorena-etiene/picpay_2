import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transferencia')
export class Transferencia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  valor!: number;

  @Column()
  data_hora!: Date;

  @Column()
  descricao!: string;

  @Column()
  conta_origem_id!: string;

  @Column()
  conta_destino_id!: string;
}