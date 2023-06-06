import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Deposito } from './deposito.entity';

export class DepositoController {
  public async list(req: Request, res: Response) {

    const depositos = await AppDataSource.manager.find(Deposito)

    res.status(200).json({ dados: depositos });
  }

  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar uma nova despesa
    
    // let descricao = req.body.descricao;
    // let valor = req.body.valor;
    // let data = req.body.data;

    let { valor, data_hora, conta_id } = req.body;

    let deposito = new Deposito();
    deposito.valor = valor;
    deposito.data_hora = data_hora;
    deposito.conda_id = conta_id;
    
    

    const _deposito = await AppDataSource.manager.save(deposito);

    res.status(201).json(_deposito);
  }

  public async update(req: Request, res:Response ){
    let id_dep = req.params.id;
  }

  public async remove(req: Request, res:Response){

  }

  public async show(req: Request, res:Response){

  }
}
