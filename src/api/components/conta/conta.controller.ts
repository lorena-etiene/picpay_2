import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Conta } from './conta.entity';
import { Agencia } from '../agencia/agencia.entity';
import { Cliente } from '../cliente/cliente.entity';
import { validate } from "class-validator";


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
    conta.agencia = vrf_agencia;
    conta.cliente = vrf_cliente;

    const erros = await validate(conta);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _conta = await AppDataSource.manager.save(conta);

    res.status(201).json(_conta);
  }

  public async update (req: Request, res:Response){
    const {cod}  = req.params;

    const contaNova = await AppDataSource.manager.findOneBy(Conta, { id: parseInt(cod) });
    if(contaNova == null){
      return res.status(404).json({erro:"Conta não encontrada"});
    }
    let {saldo, tipo, sigla_tipo, valor_limite, saldo_limite} = req.body;

    contaNova.saldo = saldo;
    contaNova.tipo = tipo;
    contaNova.sigla_tipo = sigla_tipo;
    contaNova.valor_limite = valor_limite;
    contaNova.saldo_limite = saldo_limite;

    await AppDataSource.manager.save(contaNova);

    return res.status(201).json({Conta_atualizada: contaNova});
  }

  public async show (req: Request, res:Response){
    const { cod }= req.params;

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }

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

    
    
    let ok=true;
    try{
      await AppDataSource.manager.delete(Conta,_conta);
    }catch{
      ok = false;
    }finally{
      if(ok == false){
        return res.status(404).json({ erro: 'Não foi possível deletar esse conta, tem um depósito ou saque ou transferência relacionada a ela!' });
      }
      return res.status(204).json({mensagem:"Conta excluida com sucesso"})
    }
  }
}
