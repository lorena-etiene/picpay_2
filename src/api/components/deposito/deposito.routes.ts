import { Router } from 'express';
import { DepositoController } from './deposito.controller';

export class DepositoRoutes {
  private router: Router = Router();

  private controller: DepositoController;

  constructor() {
    this.controller = new DepositoController();
    this.init();
  }

  private init(): void {
    this.router.get('/', this.controller.list);
    this.router.post('/', this.controller.create);
    this.router.put('/:id_dep',this.controller.update)
    this.router.delete('/:id_dep',this.controller.remove)
    this.router.get('/:id_dep',this.controller.show)
  }

  public routes(): Router {
    return this.router;
  }
}
