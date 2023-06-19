import { Router } from 'express';
import { SaqueController } from './saque.controller';

export class SaqueRoutes {
  private router: Router = Router();

  private controller: SaqueController;

  constructor() {
    this.controller = new SaqueController();
    this.init();
  }

  private init(): void {
    this.router.post('/sacar', this.controller.create);
    this.router.get('/list', this.controller.list);
    this.router.get('/:cod', this.controller.show);
  }

  public routes(): Router {
    return this.router;
  }
}
