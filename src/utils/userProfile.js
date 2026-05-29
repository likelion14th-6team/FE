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

/** GET /users/me — authProvider 기준 카카오 회원 여부 */
export function isKakaoUser(user) {
  return user?.authProvider === "KAKAO";
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
