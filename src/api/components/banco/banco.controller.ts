import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Banco } from './banco.entity';

export class BancoController {
  public async list(req: Request, res: Response) {

    const bancos = await AppDataSource.manager.find(Banco)

    res.status(200).json({ dados: bancos });
  }

  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar uma nova despesa
    
    // let descricao = req.body.descricao;
    // let valor = req.body.valor;
    // let data = req.body.data;

    let { numero, nome_fantasia,razao_social,cnpj } = req.body;

    let banco = new Banco();
    banco.numero = numero;
    banco.nome_fantasia = nome_fantasia;
    banco.razao_social = razao_social;
    banco.cnpj = cnpj;

    const _banco = await AppDataSource.manager.save(banco);

    res.status(201).json(_banco);
  }
}
