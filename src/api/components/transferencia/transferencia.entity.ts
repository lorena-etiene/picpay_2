import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsEmail } from 'class-validator';

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

  @IsNotEmpty()
  @IsNumber()
  @Column()
  conta_origem_id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  conta_destino_id!: number;
}