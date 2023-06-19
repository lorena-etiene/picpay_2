import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@Entity('banco')
export class Banco {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  numero!: string;

  @IsNotEmpty()
  @Column()
  nome_fantasia!: string;

  @IsNotEmpty()
  @Column()
  razao_social!: string;

  @IsNotEmpty()
  @Column()
  cnpj!: string;
}