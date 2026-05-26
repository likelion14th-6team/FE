// 날짜 자연어 라벨 + 그룹핑 유틸.
// date-fns 의존 없이 vanilla JS로 구현 (학습/번들 사이즈 측면).

// 모든 함수는 시간 단위가 아니라 "년/월/일" 단위로 비교한다.

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function diffDays(a, b) {
  // 일 단위 차이 (a - b). 같은 날이면 0.
  return Math.round((startOfDay(a) - startOfDay(b)) / (1000 * 60 * 60 * 24));
}

// 월요일 시작 기준 주의 첫날. 한국 가계부 관습.
function startOfWeek(d) {
  const x = startOfDay(d);
  const day = x.getDay(); // 0 일 ~ 6 토
  const mondayOffset = (day + 6) % 7; // 일=6, 월=0, 화=1, ...
  x.setDate(x.getDate() - mondayOffset);
  return x;
}

export function isToday(date) {
  return diffDays(date, new Date()) === 0;
}

export function isYesterday(date) {
  return diffDays(date, new Date()) === -1;
}

export function isThisWeek(date) {
  const thisWeekStart = startOfWeek(new Date());
  const target = startOfDay(date);
  return target >= thisWeekStart && diffDays(target, new Date()) <= 0;
}

export function isLastWeek(date) {
  const thisWeekStart = startOfWeek(new Date());
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  const target = startOfDay(date);
  return target >= lastWeekStart && target < thisWeekStart;
}

export function isThisMonth(date) {
  const now = new Date();
  const target = new Date(date);
  return (
    target.getFullYear() === now.getFullYear() &&
    target.getMonth() === now.getMonth()
  );
}

/**
 * 날짜를 자연어 라벨로 변환.
 * 우선순위: 오늘 > 어제 > 이번 주 > 지난 주 > 이번 달 > 예전
 */
export function getDateGroupLabel(date) {
  if (isToday(date)) return '오늘';
  if (isYesterday(date)) return '어제';
  if (isThisWeek(date)) return '이번 주';
  if (isLastWeek(date)) return '지난 주';
  if (isThisMonth(date)) return '이번 달';
  return '예전';
}

/**
 * "5월 6일" 형식 짧은 날짜.
 */
export function formatShortDate(date) {
  const d = new Date(date);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

/**
 * "오전 9:15" / "오후 2:30" 형식.
 * 시간 정보가 의미 있을 때 카드 보조 텍스트에 쓰는 용도.
 */
export function formatKoreanTime(date) {
  const d = new Date(date);
  const h24 = d.getHours();
  const m = d.getMinutes();
  const isAM = h24 < 12;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const mm = String(m).padStart(2, '0');
  return `${isAM ? '오전' : '오후'} ${h12}:${mm}`;
}

/**
 * "이번 달의 새벽" 같은 거친 시간대 (보조).
 */
export function getRoughTimeOfDay(date) {
  const h = new Date(date).getHours();
  if (h < 6) return '새벽';
  if (h < 12) return '오전';
  if (h < 18) return '오후';
  return '밤';
}

/**
 * 소비 배열을 자연어 라벨로 그룹핑.
 * 입력: [{ id, date(Date|ISO string), ... }, ...]
 * 출력: [{ label: '오늘', items: [...] }, { label: '어제', ... }, ...]
 *
 * - 각 그룹 안에서는 날짜 내림차순(최신순)
 * - 그룹 순서: 오늘 → 어제 → 이번 주 → 지난 주 → 이번 달 → 예전
 */
const LABEL_ORDER = ['오늘', '어제', '이번 주', '지난 주', '이번 달', '예전'];

export function groupByDateLabel(items, getDate = (it) => it.date) {
  const buckets = new Map();

  for (const item of items) {
    const d = new Date(getDate(item));
    const label = getDateGroupLabel(d);
    if (!buckets.has(label)) buckets.set(label, []);
    buckets.get(label).push(item);
  }

  // 그룹 내부: 날짜 내림차순
  for (const arr of buckets.values()) {
    arr.sort((a, b) => new Date(getDate(b)) - new Date(getDate(a)));
  }

  // 그룹 순서: LABEL_ORDER 기준
  return LABEL_ORDER.filter((l) => buckets.has(l)).map((label) => ({
    label,
    items: buckets.get(label),
  }));
}
