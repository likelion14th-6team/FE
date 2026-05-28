import api from './axios';

/** GET /budgets — 예산 목록 */
export function fetchBudgets() {
  return api.get('/budgets').then((r) => r.data);
}

/**
 * POST /budgets — 예산 생성/갱신
 * payload: { targetMonth: '2026-05', targetAmount: 500000 }
 */
export function createBudget(payload) {
  return api.post('/budgets', payload).then((r) => r.data);
}
