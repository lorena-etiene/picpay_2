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
    this.router.post('/transferir', this.controller.create);
    this.router.get('/list', this.controller.list);
    this.router.get('/:cod', this.controller.show);
  }

  public routes(): Router {
    return this.router;
  }
}
