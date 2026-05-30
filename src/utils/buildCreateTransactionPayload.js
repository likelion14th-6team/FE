import { toPaymentDateTime } from "./dateKey";

/**
 * POST /transactions 요청 body (TransactionCreateRequestDto)
 * 필수: type, amount, paymentDate, categoryId
 * 선택: merchantName, memo, satisfaction (있을 때만 포함)
 */
export function buildCreateTransactionPayload({
  type = "EXPENSE",
  amount,
  categoryId,
  date,
  time = "12:00",
  merchantName,
  memo,
  satisfaction,
}) {
  const parsedAmount = Math.floor(Number(amount));
  if (!parsedAmount || parsedAmount < 1) {
    throw new Error("INVALID_AMOUNT");
  }
  if (!categoryId) {
    throw new Error("CATEGORY_REQUIRED");
  }
  if (!date) {
    throw new Error("DATE_REQUIRED");
  }

  const payload = {
    type,
    amount: parsedAmount,
    paymentDate: toPaymentDateTime(date, time),
    categoryId: Number(categoryId),
  };

  const merchant = merchantName?.trim();
  if (merchant) {
    payload.merchantName = merchant.slice(0, 20);
  }

  const memoText = memo?.trim();
  if (memoText) {
    payload.memo = memoText.slice(0, 255);
  }

  const sat = Number(satisfaction);
  if (sat >= 1 && sat <= 5) {
    payload.satisfaction = sat;
  }

  return payload;
}

/** 등록 폼 기본 시각 — 오늘이면 현재 시각, 아니면 12:00 */
export function getDefaultPaymentTime(dateKey) {
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  if (dateKey !== todayKey) return "12:00";
  const h = String(today.getHours()).padStart(2, "0");
  const m = String(today.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}
