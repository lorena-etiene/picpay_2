import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Deposito } from './deposito.entity';

export class DepositoController {
  //Função que lista os depósitos do banco de dados
  public async list(req: Request, res: Response) {

    const deposito = await AppDataSource.manager.find(Deposito)

    res.status(200).json({ dados: deposito });
  }

  //Função que adiciona novo registro no banco de dados com o que foi passado no body
  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar um novo depósito
    let {valor, datahora, conta_id } = req.body;

    let depo = new Deposito();
    depo.conta_id = conta_id;
    depo.data_hora = datahora;
    depo.valor = valor;

    const _deposito = await AppDataSource.manager.save(depo);

    res.status(201).json(_deposito);
  }

  //Função que exibe o registro do ID que passado no body
  public async show(req: Request, res: Response){
    let {id} = req.params
    const showdeposito = await AppDataSource.manager.findOneBy(Deposito, {id:parseInt(id)})
    return res.status(201).json(showdeposito);
  }
  //Função que exclui um registro
  public async destroy(){
    
  }
}
