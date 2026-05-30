import api from "./axios";

export function fetchTransactionCalendar({ year, month }) {
  return api
    .get("/transactions/calendar", { params: { year, month } })
    .then((r) => r.data);
}

export function fetchDailyTransactions({ date }) {
  return api
    .get("/transactions/daily", { params: { date } })
    .then((r) => r.data);
}

/**
 * POST /transactions — 거래내역 등록 (201 Created)
 * @param {Object} payload - type, amount, paymentDate, categoryId, merchantName?, memo?, satisfaction?
 */
export function createTransaction(payload) {
  return api.post("/transactions", payload).then((r) => r.data);
}

export function deleteTransaction(id) {
  return api.delete(`/transactions/${id}`).then((r) => r.data);
}
