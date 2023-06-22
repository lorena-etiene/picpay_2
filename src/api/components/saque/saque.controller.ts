import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Saque } from './saque.entity';
import { Conta } from '../conta/conta.entity';
import { validate } from "class-validator";

export class SaqueController {
  public async list(req: Request, res: Response) {

    const saques = await AppDataSource.manager.find(Saque)

    res.status(200).json({ dados: saques });
  }

  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar um novo saque

    let {valor, data_hora, conta_id } = req.body;
    const vrf_conta = await AppDataSource.manager.findOneBy (Conta, {id: conta_id});
    if(vrf_conta == null){
      return res.status(404).json({erro:"Não existe conta com esse id: "+conta_id})
    }
    if(vrf_conta.saldo-valor < 0){
      return res.status(404).json({erro:"Não foi possível realizar o saque. R$"+ valor+ " é maior que o saldo da sua conta: R$"+vrf_conta.saldo})
    }

    let saque = new Saque();
    saque.valor = valor;
    saque.data_hora = data_hora;
    saque.conta = vrf_conta;

    const erros = await validate(saque);

    if(erros.length > 0) {
      return res.status(400).json(erros);
    }

    const _saque = await AppDataSource.manager.save(saque);
    //Colocar um código para que dps do saque o saldo da conta diminua com o valor sacado. Mudar o nome da
    // função para sacar
    vrf_conta.saldo -= saque.valor;

    await AppDataSource.manager.save(vrf_conta);
    
    return res.status(201).json({Saque:saque, Conta_saldo_novo:vrf_conta});
  }

  public async show(req: Request, res:Response){
    let {cod} = req.params

    if(!Number.isInteger(parseInt(cod))) {
      return res.status(400).json();
    }

    const showsaque = await AppDataSource.manager.findOneBy(Saque, {id:parseInt(cod)})

    if (showsaque == null) {
      return res.status(404).json({ erro: 'Saque não encontrado!' });
    }

    return res.status(201).json(showsaque);
  }

}
