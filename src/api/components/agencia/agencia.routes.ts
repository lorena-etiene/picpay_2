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
