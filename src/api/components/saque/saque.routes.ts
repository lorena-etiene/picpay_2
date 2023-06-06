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
    this.router.get('/', this.controller.list);
    this.router.post('/', this.controller.create);
  }

  public routes(): Router {
    return this.router;
  }
}
