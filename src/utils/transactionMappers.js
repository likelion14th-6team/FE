import { resolveCategoryColor } from "./categoryColor";

/** GET /transactions/daily 항목 → UI 리스트 아이템 */
export function mapDailyTransaction(tx, categoryLookup) {
  return {
    id: tx.transactionId,
    title: tx.merchantName || tx.categoryName || "내역",
    categoryName: tx.categoryName,
    categoryColor: resolveCategoryColor(tx, categoryLookup),
    amount: tx.amount,
    type: tx.type,
    memo: tx.memo,
    satisfaction: tx.satisfaction,
  };
}
