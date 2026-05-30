import api from "./axios";

/** 예산 요약 — GET /reports/summary */
export const getReportSummary = (targetMonth) =>
  api
    .get("/reports/summary", { params: targetMonth ? { targetMonth } : {} })
    .then((r) => r.data);

/** 카테고리별 파이차트 — GET /reports/categories */
export const getReportCategories = (targetMonth, type = "EXPENSE") =>
  api
    .get("/reports/categories", {
      params: { type, ...(targetMonth && { targetMonth }) },
    })
    .then((r) => r.data);

/** 시간대/카테고리별 만족도 — GET /reports/satisfaction */
export const getReportSatisfaction = (targetMonth, groupBy = "TIME_PERIOD") =>
  api
    .get("/reports/satisfaction", {
      params: { groupBy, ...(targetMonth && { targetMonth }) },
    })
    .then((r) => r.data);

/** AI 한줄평 및 제안 — GET /reports/ai */
export const getReportAi = (targetMonth) =>
  api
    .get("/reports/ai", { params: targetMonth ? { targetMonth } : {} })
    .then((r) => r.data);
