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
    this.router.post('/novo', this.controller.create);
    this.router.get('/list', this.controller.list);
    this.router.get('/:cod', this.controller.show);
    this.router.put('/update/:cod', this.controller.update);
    this.router.delete('/delete/:cod', this.controller.destroy);
  }

  public routes(): Router {
    return this.router;
  }
}
