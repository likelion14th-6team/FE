const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

/** year, month(1-12) 기준 달력 그리드 (6주 × 7일) */
export function buildMonthGrid(year, month) {
  const first = new Date(year, month - 1, 1);
  const startOffset = first.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const prevMonthDays = new Date(year, month - 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < 42; i += 1) {
    const dayNum = i - startOffset + 1;
    let date;
    let inMonth = true;

    if (dayNum < 1) {
      const d = prevMonthDays + dayNum;
      date = new Date(year, month - 2, d);
      inMonth = false;
    } else if (dayNum > daysInMonth) {
      date = new Date(year, month, dayNum - daysInMonth);
      inMonth = false;
    } else {
      date = new Date(year, month - 1, dayNum);
    }

    cells.push({
      date,
      day: date.getDate(),
      inMonth,
      isSunday: date.getDay() === 0,
      key: date.toISOString().slice(0, 10),
    });
  }
  return { weekdays: WEEKDAYS, cells };
}

export function formatMonthLabel(year, month) {
  return `${year}년 ${month}월`;
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  const da = typeof a === 'string' ? a.slice(0, 10) : a.toISOString().slice(0, 10);
  const db = typeof b === 'string' ? b.slice(0, 10) : b.toISOString().slice(0, 10);
  return da === db;
}

export function formatShortDateLabel(dateStr) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}
