import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Cliente } from './cliente.entity';

export class ClienteController {
  public async list(req: Request, res: Response) {

    const despesas = await AppDataSource.manager.find(Cliente)

    res.status(200).json({ dados: Cliente });
  }

  public async create(req: Request, res: Response) {
    
    //aqui que pegamos o dados para cadastrar uma nova despesa
    
    // let descricao = req.body.descricao;
    // let valor = req.body.valor;
    // let data = req.body.data;

    let { nome, cpf_cnpj, rg, sexo, data_nascimento, renda, endereço, email, telefone } = req.body;

    let cliente = new Cliente();
    cliente.nome = nome;
    cliente.cpf_cnpj = cpf_cnpj;
    cliente.rg = rg;
    cliente.sexo = sexo;
    cliente.data_nascimento = data_nascimento;
    cliente.renda = renda;
    cliente. endereço = endereço;
    cliente.email = email;
    cliente.telefone = telefone;

    const _cliente = await AppDataSource.manager.save(cliente);

    res.status(201).json(_cliente);
  }
}
