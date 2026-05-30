/** Date → YYYY-MM-DD (로컬 타임존, toISOString UTC 오차 방지) */
export function toDateKey(date) {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function toTargetMonth(year, month) {
  return `${year}-${String(month).padStart(2, "0")}`;
}

/** YYYY-MM-DD + HH:mm → paymentDate (YYYY-MM-DDTHH:mm:ss) */
export function toPaymentDateTime(dateKey, time = "12:00") {
  return `${dateKey}T${time}:00`;
}
