import api from "./axios";

export function fetchReportSummary(params) {
  return api.get("/reports/summary", { params }).then((r) => r.data);
}
