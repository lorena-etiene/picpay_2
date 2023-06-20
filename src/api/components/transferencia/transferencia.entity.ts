import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsEmail } from 'class-validator';
import { Conta } from '../conta/conta.entity';

@Entity('transferencia')
export class Transferencia {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  valor!: number;

  @IsNotEmpty()
  @IsDateString()
  @Column()
  data_hora!: Date;

  @IsNotEmpty()
  @Column()
  descricao!: string;

  // @IsNotEmpty()
  // @IsNumber()
  // @Column()
  // conta_origem_id!: number;
  @ManyToOne(() => Conta, { eager: true })
  @JoinColumn({
    name: "conta_origem_id",
    referencedColumnName: "id"
  })
  conta_Origem!: Conta;

  /*@IsNotEmpty()
  @IsNumber()
  @Column()*/
  @ManyToOne(()=> Conta,{eager:true})
  @JoinColumn({
    name: "conta_destino_id",
    referencedColumnName: "id"
  })
  conta_Destino!: Conta;
}