import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('banco')
export class Banco {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  numero!: string;

  @Column()
  nome_fantasia!: string;

  @Column()
  razao_social!: string;

  @Column()
  cnpj!: string;
}