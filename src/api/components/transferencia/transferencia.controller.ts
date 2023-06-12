import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Transferencia } from './transferencia.entity';

export class TransferenciaController {
  public async list(req: Request, res: Response) {

    const transferencias = await AppDataSource.manager.find(Transferencia)

    res.status(200).json({ dados: transferencias });
  }

  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar uma nova despesa
    
    // let descricao = req.body.descricao;
    // let valor = req.body.valor;
    // let data = req.body.data;

    let { descricao, valor, data } = req.body;

    let transf = new Transferencia();
    transf.descricao = descricao;
    transf.data_hora = data;
    transf.valor = valor;

    const _transferencia = await AppDataSource.manager.save(transf);

    res.status(201).json(_transferencia);
  }

  public async update(){

  }

  public async show(){

  }

  public async destroy(){
    
  }
}
