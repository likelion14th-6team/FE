import api from "./axios";

/**
 * GET /categories 응답 정규화
 * - 명세: data.categories[]
 * - 배포 OpenAPI: data가 CategoryResponse[] 배열
 */
function normalizeCategoriesList(data, type) {
  let list = [];
  if (Array.isArray(data)) {
    list = data;
  } else if (Array.isArray(data?.categories)) {
    list = data.categories;
  }
  if (type) {
    list = list.filter((c) => c.type === type);
  }
  return list;
}

/**
 * GET /categories — 카테고리 목록
 * @param {{ type?: 'INCOME' | 'EXPENSE' }} params — 서버 미지원 시 클라이언트 필터
 */
export function fetchCategories({ type } = {}) {
  const params = type ? { type } : undefined;
  return api.get("/categories", { params }).then((r) => {
    const list = normalizeCategoriesList(r.data, type);
    if (process.env.NODE_ENV === "development") {
      console.info("[categories]", { raw: r.data, count: list.length, type });
    }
    return list;
  });
}
