import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Deposito } from './deposito.entity';
import { Conta } from '../conta/conta.entity';
import { validate } from "class-validator";

export class DepositoController {
  //Função que lista os depósitos do banco de dados
  public async list(req: Request, res: Response) {

    const depositos = await AppDataSource.manager.find(Deposito)

    res.status(200).json({ dados: depositos });
  }

  //Função que adiciona novo registro no banco de dados com o que foi passado no body
  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar um novo depósito
    let {valor, data_hora, conta_id } = req.body;

    const vrf_conta = await AppDataSource.manager.findOneBy (Conta, {id: conta_id});
    if(vrf_conta == null){
      return res.status(404).json({erro:"Não existe conta com esse id: "+conta_id})
    }
    if(vrf_conta.saldo+valor > vrf_conta.saldo_limite){
      return res.status(404).json({erro:"Não foi possível realizar o depósito. R$"+ valor+ " vai exceder o limite de saldo da sua conta: "+vrf_conta.saldo_limite})
    }
    let depo = new Deposito();
    depo.conta_id = conta_id;
    depo.data_hora = data_hora;
    depo.valor = valor;

    const erros = await validate(depo);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _deposito = await AppDataSource.manager.save(depo);
    //Colocar um código para que dps do depósito o saldo da conta aumentar com o valor depositado
    // Mudar o nome da função para depositar
    vrf_conta.saldo += depo.valor;
    
    await AppDataSource.manager.save(vrf_conta);
    return res.status(201).json({Deposito:_deposito,Conta_saldo_novo:vrf_conta});
  }

  //Função que exibe o registro do ID que passado no body
  public async show(req: Request, res: Response){
    let {cod} = req.params

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }

    const showdeposito = await AppDataSource.manager.findOneBy(Deposito, {id:parseInt(cod)})

    if (showdeposito == null) {
      return res.status(404).json({ erro: 'Depósito não encontrado!' });
    }

    return res.status(201).json(showdeposito);
  }

}
