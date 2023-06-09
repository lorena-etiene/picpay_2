import { Request, Response } from 'express';

export class BaseController {
  
  public index(req: Request, res: Response) {
    res.status(200).json({ mensagem: 'Api está rodando....' });
  }

  public info(req: Request, res: Response) {
    res.status(200).json({
      name: 'API REST - Picpay 2 - A melhor solução financeira',
      mode: 'development',
      version: '1.0.1',
    });
  }
}
