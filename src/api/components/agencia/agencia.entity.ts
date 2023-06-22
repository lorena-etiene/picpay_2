import { StreamOptions } from 'morgan';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsEmail } from 'class-validator';
import { Banco } from '../banco/banco.entity';

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


  @IsEmail()
  @IsOptional()
  @Column()
  email!: string;

  

  @ManyToOne(() => Banco, {eager:true})
  @JoinColumn({
    name:"ban_id",
    referencedColumnName:"id"
  })
  banco!: Banco;
}