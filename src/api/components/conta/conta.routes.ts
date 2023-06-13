import { Router } from 'express';
import { ContaController } from './conta.controller';

export class ContaRoutes {
  private router: Router = Router();

  private controller: ContaController;

  constructor() {
    this.controller = new ContaController();
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
