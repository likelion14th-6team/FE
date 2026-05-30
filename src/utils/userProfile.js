const GENDER_LABEL = {
  MALE: "남성",
  FEMALE: "여성",
  OTHER: "기타",
};

const AGE_GROUP_LABEL = {
  "10s": "10대",
  "20s": "20대",
  "30s": "30대",
  "40s": "40대",
  "50s": "50대",
  "60s+": "60대 이상",
};

/** GET /users/me — authProvider 기준 카카오 회원 여부.
 *  API가 authProvider 필드를 안 줄 경우 localStorage 플래그(setKakaoUserFlag)로 보완. */
export function isKakaoUser(user) {
  if (user?.authProvider === "KAKAO") return true;
  // 백엔드가 authProvider를 다른 이름으로 줄 수 있어 추가 체크
  if (user?.provider === "KAKAO" || user?.loginType === "KAKAO" || user?.socialType === "KAKAO") return true;
  // 위 필드가 없으면 카카오 로그인 시 저장한 localStorage 플래그 사용
  return localStorage.getItem("kakaoUser") === "true";
}

/** MembershipBadge / Avatar용 type */
export function getMembershipType(user) {
  return isKakaoUser(user) ? "kakao" : "normal";
}

export function formatGender(gender) {
  if (!gender) return "-";
  return GENDER_LABEL[gender] || gender;
}

export function formatAgeGroup(ageGroup) {
  if (!ageGroup) return "-";
  return AGE_GROUP_LABEL[ageGroup] || ageGroup;
}

export function getCurrentTargetMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
