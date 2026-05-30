// 예산 포맷: "500000" → "500,000원"
export function formatBudget(value) {
  if (!value && value !== 0) return "";
  const num =
    typeof value === "string"
      ? parseInt(value.replace(/[^0-9]/g, ""), 10)
      : value;
  if (Number.isNaN(num)) return "";
  return `${num.toLocaleString()}원`;
}

// 예산 파싱: "500,000원" → 500000
export function parseBudget(value) {
  if (!value) return 0;
  return parseInt(String(value).replace(/[^0-9]/g, ""), 10);
}
