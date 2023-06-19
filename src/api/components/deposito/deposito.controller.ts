import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Deposito } from './deposito.entity';
import { Conta } from '../conta/conta.entity';

export class DepositoController {
  //Função que lista os depósitos do banco de dados
  public async list(req: Request, res: Response) {

    const depositos = await AppDataSource.manager.find(Deposito)

    res.status(200).json({ dados: depositos });
  }

  //Função que adiciona novo registro no banco de dados com o que foi passado no body
  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar um novo depósito
    let {valor, datahora, conta_id } = req.body;

    const vrf_conta = await AppDataSource.manager.findOneBy (Conta, {id: conta_id});
    if(vrf_conta == null){
      return res.status(404).json({erro:"Não existe conta com esse id: "+conta_id})
    }
    if(vrf_conta.saldo+valor > vrf_conta.saldo_limite){
      return res.status(404).json({erro:"Não foi possível realizar o depósito. R$"+ valor+ " vai exceder o limite de saldo da sua conta: "+vrf_conta.saldo_limite})
    }
    let depo = new Deposito();
    depo.conta_id = conta_id;
    depo.data_hora = datahora;
    depo.valor = valor;

    const _deposito = await AppDataSource.manager.save(depo);
    //Colocar um código para que dps do depósito o saldo da conta aumentar com o valor depositado
    // Mudar o nome da função para depositar
    const saldoAntigo = vrf_conta;
    vrf_conta.saldo += depo.valor;
    
    await AppDataSource.manager.save(vrf_conta);

    return res.status(201).json({Deposito:_deposito,Saldo_antigo: saldoAntigo, Saldo_novo:vrf_conta});
  }

  //Função que exibe o registro do ID que passado no body
  public async show(req: Request, res: Response){
    let {cod} = req.params
    const showdeposito = await AppDataSource.manager.findOneBy(Deposito, {id:parseInt(cod)})
    if (showdeposito == null) {
      return res.status(404).json({ erro: 'Depósito não encontrado!' });
    }
    return res.status(201).json(showdeposito);
  }

}
