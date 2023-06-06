import { Router } from 'express';
import { BancoController } from './banco.controller';

export class BancoRoutes {
  private router: Router = Router();

  private controller: BancoController;

  constructor() {
    this.controller = new BancoController();
    this.init();
  }

  private init(): void {
    this.router.get('/', this.controller.list);
    this.router.post('/', this.controller.create);
  }

  public routes(): Router {
    return this.router;
  }
}
