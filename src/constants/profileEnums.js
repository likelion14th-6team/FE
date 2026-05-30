/** 폼/UI 표시 ↔ 백엔드 enum */
export const GENDER_MAP = { male: "MALE", female: "FEMALE" };
export const GENDER_FROM_API = { MALE: "male", FEMALE: "female" };

export const AGE_OPTIONS = ["10대", "20대", "30대", "40대", "50대+"];

export const AGE_MAP = {
  "10대": "10s",
  "20대": "20s",
  "30대": "30s",
  "40대": "40s",
  "50대+": "50s",
};

export const AGE_FROM_API = Object.fromEntries(
  Object.entries(AGE_MAP).map(([label, value]) => [value, label]),
);

export function isMissingProfileField(value) {
  return value == null || value === "";
}
