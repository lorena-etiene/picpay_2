import { Router } from 'express';
import { BaseRoutes } from './base/base.routes';
import { DespesaRoutes } from './despesa/despesa.routes';
import { BancoRoutes } from './banco/banco.routes';
import { AgenciaRoutes } from './agencia/agencia.routes';
import { SaqueRoutes } from './saque/saque.routes';
import { TransferenciaRoutes } from './transferencia/transferencia.routes';
import { DepositoRoutes } from './deposito/deposito.routes';
/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerRoutes(router: Router, prefix: string = ''): void {
  router.use(`${prefix}`, new BaseRoutes().routes());
  router.use(`${prefix}/despesas`, new DespesaRoutes().routes());
  router.use(`${prefix}/agencia`, new AgenciaRoutes().routes())
  router.use(`${prefix}/banco`, new BancoRoutes().routes())
  router.use(`${prefix}/deposito`, new DepositoRoutes().routes())
  router.use(`${prefix}/saque`, new AgenciaRoutes().routes())
  router.use(`${prefix}/transferencia`, new AgenciaRoutes().routes())




}
