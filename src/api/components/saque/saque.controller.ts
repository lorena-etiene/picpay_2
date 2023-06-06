import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Saque } from './saque.entity';

export class SaqueController {
  public async list(req: Request, res: Response) {

    const saques = await AppDataSource.manager.find(Saque)

    res.status(200).json({ dados: saques });
  }

  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar uma nova despesa
    
    // let descricao = req.body.descricao;
    // let valor = req.body.valor;
    // let data = req.body.data;

    let { valor, data, conta_id } = req.body;

    let saque = new Saque();
    saque.valor = valor;
    saque.data_hora = data;
    saque.conta_id = conta_id;
    

    const _despesa = await AppDataSource.manager.save(saque);

    res.status(201).json(_despesa);
  }
}
