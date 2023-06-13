import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('despesas')
export class Despesa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'decimal', 
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
  })
  valor!: number;
 
  @Column()
    data_hora!: Date;

  @Column()
   descricao!: Date;


  @Column({ 
    type: 'decimal',
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
   })
  valor_pago!: number;

  @Column()
  pago!: boolean;
}