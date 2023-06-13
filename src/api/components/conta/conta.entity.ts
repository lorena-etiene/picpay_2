import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('conta')
export class Conta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  numero!: number;

  @Column()
  data_abertura!: Date;

  @Column({
    type: 'decimal', 
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
  })
  saldo!: number;

  @Column()
  tipo!: string;

  @Column()
  sigla_tipo!: string;
  
  @Column({ 
    type: 'decimal',
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
   })
  valor_limite!: number;

  @Column({ 
    type: 'decimal',
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
   })
  saldo_limite!: number;

  @Column()
  agencia_id!: number;

  @Column()
  cliente_id!: number;
}