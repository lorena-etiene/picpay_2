import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsEmail } from 'class-validator';

@Entity('conta')
export class Conta {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  numero!: number;

  @IsNotEmpty()
  @IsDateString()
  @Column()
  data_abertura!: Date;

  @IsNotEmpty()
  @IsNumber()
  @Column({
    type: 'decimal', 
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
  })
  saldo!: number;

  @IsNotEmpty()
  @Column()
  tipo!: string;

  @IsNotEmpty()
  @Column()
  sigla_tipo!: string;
  
  @IsNotEmpty()
  @IsNumber()
  @Column({ 
    type: 'decimal',
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
   })
  valor_limite!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column({ 
    type: 'decimal',
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
   })
  saldo_limite!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  agencia_id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  cliente_id!: number;
}