// 소비 카테고리 마스터 정보.
// 백엔드 응답이 없을 때 더미용으로 쓰고, 백엔드 카테고리 키와 매핑 키도 동일하게 유지 권장.

export const CATEGORIES = {
  food:      { key: 'food',      label: '식비',   emoji: '🍚', color: '#FFB088' },
  transport: { key: 'transport', label: '교통',   emoji: '🚇', color: '#A5C9E0' },
  cafe:      { key: 'cafe',      label: '카페',   emoji: '☕', color: '#C9A88A' },
  shopping:  { key: 'shopping',  label: '쇼핑',   emoji: '🛍️', color: '#F5A8B8' },
  culture:   { key: 'culture',   label: '문화',   emoji: '🎬', color: '#C5A8E0' },
  clothing:  { key: 'clothing',  label: '의류',   emoji: '👕', color: '#FFD479' },
  etc:       { key: 'etc',       label: '기타',   emoji: '📦', color: '#B8B8B8' },
};

// 배열 형태로도 쓸 수 있게 (필터 칩 등에서 map 돌릴 때 편함)
export const CATEGORY_LIST = Object.values(CATEGORIES);

// 후회 소비 기준: 만족도가 이 점수 이하면 후회 소비로 분류
export const REGRET_THRESHOLD = 2;
