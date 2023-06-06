import { Router } from 'express';
import { AgenciaController } from './agencia.controller';

export class AgenciaRoutes {
  private router: Router = Router();

  private controller: AgenciaController;

  constructor() {
    this.controller = new AgenciaController();
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
