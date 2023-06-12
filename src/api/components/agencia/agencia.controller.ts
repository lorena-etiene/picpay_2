import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Agencia } from './agencia.entity';
import { Banco } from '../banco/banco.entity';

export class AgenciaController {
  public async list(req: Request, res: Response) {

    const despesas = await AppDataSource.manager.find(Agencia)

    res.status(200).json({ dados: despesas });
  }
   //Verifica se existe um banco e cria uma agencia
  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar uma nova despesa
    
    // let descricao = req.body.descricao;
    // let valor = req.body.valor;
    // let data = req.body.data;

    let { numero, nome_fantasia,razao_social,cnpj,telefone, email, ban_id  } = req.body;
    const vrf_banco = await AppDataSource.manager.findOneBy(Banco, {id: ban_id})
    //Verifica se existe o banco com o id inserido.
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
    agc.ban_id = ban_id;

    const _agencia = await AppDataSource.manager.save(agc);

    res.status(201).json(_agencia);
  }
  public async update(){

  }

  public async show(){

  }

  public async destroy(){
    
  }
}
