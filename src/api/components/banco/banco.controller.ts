import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Banco } from './banco.entity';
import { validate } from "class-validator";

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

    const erros = await validate(banco);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _banco = await AppDataSource.manager.save(banco);

    return console.log("Banco criado com sucesso"), res.status(201).json(_banco);
  }

  public async update (req: Request, res:Response){
    
    const {cod}  = req.params;

    const bancoNovo = await AppDataSource.manager.findOneBy(Banco, { id: parseInt(cod) });
    if(bancoNovo == null){
      return res.status(404).json({erro:"Banco não encontrado"});
    }

    let { numero, nome_fantasia,razao_social,cnpj } = req.body;
    bancoNovo.numero = numero;
    bancoNovo.nome_fantasia = nome_fantasia;
    bancoNovo.razao_social = razao_social;
    bancoNovo.cnpj = cnpj;

    await AppDataSource.manager.save(bancoNovo);

    return console.log("Banco atualizado com sucesso"),res.status(201).json({Banco_atualizado: bancoNovo});
  }

  public async show (req: Request, res:Response){
    const { cod }= req.params;

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }

    const _banco = await AppDataSource.manager.findOneBy(Banco, { id: parseInt(cod) });

    if (_banco == null) {
      return res.status(404).json({ erro: 'Banco não encontrado!' });
    }

    return res.json(_banco);
  }

  public async destroy (req: Request, res:Response){
    const { cod }= req.params;

    const _banco = await AppDataSource.manager.findOneBy(Banco, { id: parseInt(cod) });

    if (_banco == null) {
      return res.status(404).json({ erro: 'Banco não encontrado!' });
    }
    
    let ok=true;
    try{
      await AppDataSource.manager.delete(Banco,_banco);
    }catch{
      ok = false;
    }finally{
      if(ok == false){
        return res.status(404).json({ erro: 'Não foi possível deletar esse banco, tem uma agência relacionada a ele!' });
      }
      return res.status(204).json({mensagem:"Banco excluido com sucesso"})
    }
    
  }
}
