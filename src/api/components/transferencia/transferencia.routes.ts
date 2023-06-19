import { Router } from 'express';
import { TransferenciaController } from './transferencia.controller';

export class TransferenciaRoutes {
  private router: Router = Router();

  private controller: TransferenciaController;

  constructor() {
    this.controller = new TransferenciaController();
    this.init();
  }

  private init(): void {
    this.router.get('/', this.controller.list);
    this.router.post('/', this.controller.create);
    this.router.get('/:cod', this.controller.show);
  }

  public routes(): Router {
    return this.router;
  }
}
