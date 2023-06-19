import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Conta } from './conta.entity';
import { Agencia } from '../agencia/agencia.entity';
import { Cliente } from '../cliente/cliente.entity';


export class ContaController {
  public async list(req: Request, res: Response) {

    const contas = await AppDataSource.manager.find(Conta)

    res.status(200).json({ dados: contas });
  }

  public async create(req: Request, res: Response) {
    
    let { numero, data_abertura, saldo, tipo, sigla_tipo, valor_limite, saldo_limite, agencia_id, cliente_id } = req.body;

    const vrf_agencia = await AppDataSource.manager.findOneBy(Agencia, {id: agencia_id})
    //Verifica se existe a agencia com o id inserido.
    if(vrf_agencia == null){
      return res.status(404).json({erro:"Não existe agência com esse id: "+agencia_id})
    }

    const vrf_cliente = await AppDataSource.manager.findOneBy(Cliente, {id: cliente_id})
    //Verifica se existe o cliente com o id inserido.
    if(vrf_cliente == null){
      return res.status(404).json({erro:"Não existe cliente com esse id: "+cliente_id})
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

  public async update (req: Request, res:Response){
    const {cod}  = req.params;

    const contaNova = await AppDataSource.manager.findOneBy(Conta, { id: parseInt(cod) });
    if(contaNova == null){
      return res.status(404).json({erro:"Conta não encontrada"});
    }
    const contaAntiga = contaNova;
    let {saldo, tipo, sigla_tipo, valor_limite, saldo_limite} = req.body;

    contaNova.saldo = saldo;
    contaNova.tipo = tipo;
    contaNova.sigla_tipo = sigla_tipo;
    contaNova.valor_limite = valor_limite;
    contaNova.saldo_limite = saldo_limite;

    await AppDataSource.manager.save(contaNova);

    return res.status(201).json({Registro_antigo:contaAntiga, Registro_Novo: contaNova});
  }

  public async show (req: Request, res:Response){
    const { cod }= req.params;

    const _conta = await AppDataSource.manager.findOneBy(Conta, { id: parseInt(cod) });

    if (_conta == null) {
      return res.status(404).json({ erro: 'Conta não encontrada!' });
    }

    return res.json(_conta);
  }

  public async destroy (req: Request, res:Response){
    const { cod }= req.params;

    const _conta = await AppDataSource.manager.findOneBy(Conta, { id: parseInt(cod) });

    if (_conta == null) {
      return res.status(404).json({ erro: 'Conta não encontrada!' });
    }

    await AppDataSource.manager.delete(Conta,_conta);

    return res.status(204).json({conta_deletada: _conta});
  }
}
