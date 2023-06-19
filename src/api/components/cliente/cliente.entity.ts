import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsEmail } from 'class-validator';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  nome!: string;

  @IsNotEmpty()
  @Column()
  cpf_cnpj!: string;

  @IsNotEmpty()
  @Column()
  rg!: string;

  @IsNotEmpty()
  @Column()
  sexo!: string;

  @IsNotEmpty()
  @IsDateString()
  @Column()
  data_nascimento!: Date;

  @IsNotEmpty()
  @IsNumber()
  @Column({ 
    type: 'decimal',
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
   })
  renda!: number;

  @IsNotEmpty()
  @Column()
  endereço!: string;

  @IsOptional()
  @IsEmail()
  @Column()
  email!: string;

  @Column()
  telefone!: string;
}