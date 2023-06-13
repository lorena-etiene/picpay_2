import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Conta } from './conta.entity';
import { Agencia } from '../agencia/agencia.entity';
import { Cliente } from '../cliente/cliente.entity';


export class ContaController {
  public async list(req: Request, res: Response) {

    const despesas = await AppDataSource.manager.find(Conta)

    res.status(200).json({ dados: Conta });
  }

  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar uma nova despesa
    
    // let descricao = req.body.descricao;
    // let valor = req.body.valor;
    // let data = req.body.data;

    let { numero, data_abertura, saldo, tipo, sigla_tipo, valor_limite, saldo_limite, agencia_id, cliente_id } = req.body;

    const vrf_cliente = await AppDataSource.manager.findOneBy(Cliente, {id: cliente_id})
    //Verifica se existe o cliente com o id inserido.
    if(vrf_cliente == null){
      return res.status(404).json({erro:"Não existe banco com esse id: "+cliente_id})
    }

    const vrf_agencia = await AppDataSource.manager.findOneBy(Agencia, {id: agencia_id})
    //Verifica se existe a agencia com o id inserido.
    if(vrf_agencia == null){
      return res.status(404).json({erro:"Não existe banco com esse id: "+agencia_id})
    }

    let conta = new Conta();
    conta.numero = numero;
    conta.data_abertura = data_abertura;
    conta.saldo = saldo;
    conta.tipo = tipo;
    conta.sigla_tipo = sigla_tipo;
    conta.valor_limite = valor_limite;
    conta.saldo_limite = saldo_limite;
    conta.agencia_id = agencia_id;
    conta.cliente_id = cliente_id;

    const _conta = await AppDataSource.manager.save(conta);

    res.status(201).json(_conta);
  }
}
