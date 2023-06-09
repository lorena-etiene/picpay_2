import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Agencia } from './agencia.entity';
import { Banco } from '../banco/banco.entity';
import { validate } from "class-validator";

export class AgenciaController {
  public async list(req: Request, res: Response) {

    const agencias = await AppDataSource.manager.find(Agencia)

    return res.status(200).json({ dados: agencias });
  }
   //Verifica se existe um banco e cria uma agencia
  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar uma nova despesa
    
    let { numero, nome_fantasia,razao_social,cnpj,telefone, email, ban_id } = req.body;
    
    //Verifica se existe o banco com o id inserido.
    const vrf_banco = await AppDataSource.manager.findOneBy(Banco, {id: ban_id})
    if(vrf_banco == null){
      return res.status(404).json({erro:"Não existe banco com esse id: "+ban_id})
    }

    let agc = new Agencia();
    agc.numero = numero;
    agc.nome_fantasia = nome_fantasia;
    agc.razao_social = razao_social;
    agc.cnpj = cnpj;
    agc.telefone = telefone;
    agc.email = email;
    agc.banco = vrf_banco;

    const erros = await validate(agc);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _agencia = await AppDataSource.manager.save(agc);

    return res.status(201).json(_agencia);
  }
  
  public async update (req: Request, res:Response){
    const {cod}  = req.params;

    const agenciaNova = await AppDataSource.manager.findOneBy(Agencia, { id: parseInt(cod) });
    if(agenciaNova == null){
      return res.status(404).json({erro:"Agência não encontrada"});
    }
    let { numero, nome_fantasia,razao_social,cnpj, telefone, email, ban_id } = req.body;
    const vrf_banco = await AppDataSource.manager.findOneBy(Banco, {id: ban_id})
    if(vrf_banco == null){
      return res.status(404).json({erro:"Não existe banco com esse id: "+ban_id})
    }

    agenciaNova.numero = numero;
    agenciaNova.nome_fantasia = nome_fantasia;
    agenciaNova.razao_social = razao_social;
    agenciaNova.cnpj = cnpj;
    agenciaNova.telefone = telefone;
    agenciaNova.email = email;
    agenciaNova.banco = vrf_banco;

    await AppDataSource.manager.save(agenciaNova);

    return res.status(201).json({Agencia_atualizada: agenciaNova});
  }

  public async show (req: Request, res:Response){
    const { cod }= req.params;

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }

    const _agencia = await AppDataSource.manager.findOneBy(Agencia, { id: parseInt(cod) });

    if (_agencia == null) {
      return res.status(404).json({ erro: 'Agência não encontrada!' });
    }

    return res.json(_agencia);
  }

  public async destroy (req: Request, res:Response){
    const { cod }= req.params;

    const agencia = await AppDataSource.manager.findOneBy(Agencia, { id: parseInt(cod) });

    if (agencia == null) {
      return res.status(404).json({ erro: 'Agência não encontrada!' });
    }

    //await AppDataSource.manager.delete(Agencia,_agencia);
    //return res.status(200).json({mensagem:"Agência excluida com sucesso!"});
    let ok=true;
    try{
      await AppDataSource.manager.delete(Agencia,agencia);
    }catch{
      ok = false;
    }
    finally{
      if(ok == false){
        return res.status(404).json({ erro: 'Não foi possível deletar essa agência, tem uma conta relacionada a ela!' });
      }
      return res.status(200).json({mensagem:"Agência excluida com sucesso!"});
    }
  }
}
