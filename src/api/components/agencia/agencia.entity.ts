import { StreamOptions } from 'morgan';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsEmail } from 'class-validator';

@Entity('agencia')
export class Agencia {
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

  @Column()
  telefone!: string;

  @IsOptional()
  @IsEmail()
  @Column()
  email!: string;

  @IsNotEmpty()
  @Column()
  ban_id!: number;
}