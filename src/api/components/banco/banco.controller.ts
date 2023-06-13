import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Banco } from './banco.entity';

export class BancoController {
  public async list(req: Request, res: Response) {

    const bancos = await AppDataSource.manager.find(Banco)

    res.status(200).json({ dados: bancos });
  }

  public async create(req: Request, res: Response) {

    let { numero, nome_fantasia,razao_social,cnpj } = req.body;

    let banco = new Banco();
    banco.numero = numero;
    banco.nome_fantasia = nome_fantasia;
    banco.razao_social = razao_social;
    banco.cnpj = cnpj;

    const _banco = await AppDataSource.manager.save(banco);

    res.status(201).json(_banco);
  }
  public async update (req: Request, res:Response){
    
    const {cod}  = req.params;

    const bancoNovo = await AppDataSource.manager.findOneBy(Banco, { id: parseInt(cod) });
    res.json(bancoNovo);
    /*if(bancoNovo == null){
      return res.status(400).json({erro:"Banco não encontrado"});
    }
    const bancoAntigo = bancoNovo;
    let { numero, nome_fantasia,razao_social,cnpj } = req.body;
    bancoNovo.numero = numero;
    bancoNovo.nome_fantasia = nome_fantasia;
    bancoNovo.razao_social = razao_social;
    bancoNovo.cnpj = cnpj;

    await AppDataSource.manager.save(bancoNovo);

    res.status(201).json({Registroantigo:bancoAntigo, RegistroNovo: bancoNovo});
    */
  }

  public async show (req: Request, res:Response){

  }

  public async destroy (req: Request, res:Response){

  }
}
