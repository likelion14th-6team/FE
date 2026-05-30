/** 카테고리 목록 → id / name 으로 colorCode 조회 */
export function buildCategoryColorLookup(categories = []) {
  const byId = {};
  const byName = {};
  categories.forEach((c) => {
    const color = c.colorCode || c.categoryColor;
    if (color && c.categoryId != null) byId[c.categoryId] = color;
    if (color && c.name) byName[c.name] = color;
  });
  return { byId, byName };
}

/**
 * 거래 항목의 카테고리 색상 (daily API + 카테고리 목록 fallback)
 */
export function resolveCategoryColor(tx, lookup) {
  const fromTx = tx.categoryColor || tx.colorCode;
  if (fromTx) return fromTx;
  if (lookup?.byId?.[tx.categoryId]) return lookup.byId[tx.categoryId];
  if (lookup?.byName?.[tx.categoryName]) return lookup.byName[tx.categoryName];
  return "#B0B8B4";
}
