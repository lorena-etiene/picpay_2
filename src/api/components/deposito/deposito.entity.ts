import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsEmail } from 'class-validator';


@Entity('deposito')
export class Deposito {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column({
    type: 'decimal', 
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
  })
  valor!: number;

  @IsNotEmpty()
  @IsDateString()
  @Column()
  data_hora!: Date;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  conta_id!: number;
}