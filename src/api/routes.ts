import { Router } from 'express';
import { registerRoutes } from './components';

/**
 * Init Express REST routes
 *
 * @param {Router} router
 * @returns {void}
 */
export function initRoutes(router: Router): void {
  const prefix: string = '/picpay_2/v1';

  registerRoutes(router, prefix);
}
