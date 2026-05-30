import api from './axios';

/** GET /budgets — 이번 달(또는 targetMonth) 예산 조회 */
export function fetchBudgets(params) {
  return api.get('/budgets', { params }).then((r) => r.data);
}

/** POST /budgets — 월별 예산 최초 설정 */
export function createBudget(payload) {
  return api.post('/budgets', payload).then((r) => r.data);
}

/**
 * PATCH /budgets — 이미 설정된 월 예산 수정
 * (409 메시지: "수정을 원하시면 PATCH를 이용해주세요")
 */
export function updateBudget(payload) {
  return api.patch('/budgets', payload).then((r) => r.data);
}

/**
 * 예산 생성 또는 수정.
 * - 기존 예산이 있으면 PATCH, 없으면 POST
 * - POST 409 시 PATCH로 재시도
 */
export async function upsertBudget(payload) {
  try {
    const budgets = await fetchBudgets({
      targetMonth: payload.targetMonth,
    });
    if (budgets?.budgetId != null) {
      return updateBudget(payload);
    }
  } catch (err) {
    // 404 = 해당 월 예산 없음 → POST로 생성
    if (err.response?.status !== 404) throw err;
  }

  try {
    return await createBudget(payload);
  } catch (err) {
    if (err.response?.status === 409) {
      return updateBudget(payload);
    }
    throw err;
  }
}
