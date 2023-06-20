import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Transferencia } from './transferencia.entity';
import { Conta } from '../conta/conta.entity';
import { validate } from "class-validator";

export class TransferenciaController {
  public async list(req: Request, res: Response) {

    const transferencias = await AppDataSource.manager.find(Transferencia, {
      relations: {
        conta_Origem: true
      }
    })

    res.status(200).json({ dados: transferencias });
  }

  public async create(req: Request, res: Response) {
    
    let { descricao, valor, data_hora, conta_origem_id, conta_destino_id } = req.body;

    //Verifica se é possivel fazer o saque da conta origem
    const vrf_conta_ori = await AppDataSource.manager.findOneBy (Conta, {id: conta_origem_id});
    if(vrf_conta_ori == null){
      return res.status(404).json({erro:"Não existe conta com esse id: "+conta_origem_id})
    }
    if(vrf_conta_ori.saldo-valor < 0){
      return res.status(404).json({erro:"Não foi possível realizar o saque. R$"+ valor+ " é maior que o saldo da sua conta: R$"+vrf_conta_ori.saldo})
    }

    //Verifica se é possivel depositar na conta destino
    const vrf_conta_des = await AppDataSource.manager.findOneBy (Conta, {id: conta_destino_id});
    if(vrf_conta_des == null){
      return res.status(404).json({erro:"Não existe conta com esse id: "+conta_destino_id})
    }
    if(vrf_conta_des.saldo+valor > vrf_conta_des.saldo_limite){
      return res.status(404).json({erro:"Não foi possível realizar o depósito. R$"+ valor+ " vai exceder o limite de saldo da sua conta: R$"+vrf_conta_des.saldo_limite})
    }

    let transf = new Transferencia();
    transf.descricao = descricao;
    transf.data_hora = data_hora;
    transf.valor = valor;
    transf.conta_Origem = vrf_conta_ori;
    transf.conta_Destino = vrf_conta_des;

    const erros = await validate(transf);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _transferencia = await AppDataSource.manager.save(transf);
    vrf_conta_ori.saldo -= transf.valor;
    vrf_conta_des.saldo += transf.valor;
    await AppDataSource.manager.save(vrf_conta_ori);
    await AppDataSource.manager.save(vrf_conta_des);

    /*Colocar um código para que dps da transferencia o saldo da conta origem diminua  e o 
     saldo da conta destino aumente. Mudar o nome da função para transferir*/
    return res.status(201).json({Transferencia:_transferencia,Conta_origem_saldo_novo:vrf_conta_ori, Conta_destino_saldo_novo:vrf_conta_des});
  }

  public async show(req: Request, res: Response){
    let {cod} = req.params

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }

    const showtrans = await AppDataSource.manager.findOneBy(Transferencia, {id:parseInt(cod)})

    if (showtrans == null) {
      return res.status(404).json({ erro: 'Transferencia não encontrado!' });
    }

    return res.status(201).json(showtrans);
  }
}
