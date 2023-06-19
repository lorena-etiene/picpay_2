import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Banco } from './banco.entity';

export class BancoController {
  public async list(req: Request, res: Response) {

    const bancos = await AppDataSource.manager.find(Banco)

    return res.status(200).json({ dados: bancos });
  }

  public async create(req: Request, res: Response) {

    let { numero, nome_fantasia,razao_social,cnpj } = req.body;

    let banco = new Banco();
    banco.numero = numero;
    banco.nome_fantasia = nome_fantasia;
    banco.razao_social = razao_social;
    banco.cnpj = cnpj;

    const _banco = await AppDataSource.manager.save(banco);

    return console.log("Banco criado com sucesso"), res.status(201).json(_banco);
  }

  public async update (req: Request, res:Response){
    
    const {cod}  = req.params;

    const bancoNovo = await AppDataSource.manager.findOneBy(Banco, { id: parseInt(cod) });
    if(bancoNovo == null){
      return res.status(404).json({erro:"Banco não encontrado"});
    }
    let bancoAntigo = new Banco();
    bancoAntigo.id = bancoNovo.id;
    bancoAntigo.numero = bancoNovo.numero;
    bancoAntigo.nome_fantasia = bancoNovo.nome_fantasia;
    bancoAntigo.razao_social = bancoNovo.razao_social;
    bancoAntigo.cnpj = bancoNovo.cnpj;
    
    let { numero, nome_fantasia,razao_social,cnpj } = req.body;
    bancoNovo.numero = numero;
    bancoNovo.nome_fantasia = nome_fantasia;
    bancoNovo.razao_social = razao_social;
    bancoNovo.cnpj = cnpj;

    await AppDataSource.manager.save(bancoNovo);

    return console.log("Banco atualizado com sucesso"),res.status(201).json({Registro_antigo:bancoAntigo, Registro_Novo: bancoNovo});
  }

  public async show (req: Request, res:Response){
    const { cod }= req.params;

    const _banco = await AppDataSource.manager.findOneBy(Banco, { id: parseInt(cod) });

    if (_banco == null) {
      return res.status(404).json({ erro: 'Despesa não encontrada!' });
    }

    return res.json(_banco);
  }

  public async destroy (req: Request, res:Response){
    const { cod }= req.params;

    const _banco = await AppDataSource.manager.findOneBy(Banco, { id: parseInt(cod) });

    if (_banco == null) {
      return res.status(404).json({ erro: 'Despesa não encontrada!' });
    }
    await AppDataSource.manager.delete(Banco,_banco);

    return console.log("Banco excluido com sucesso"),res.status(204).json();
  }
}
