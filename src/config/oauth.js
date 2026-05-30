/**
 * 카카오 OAuth 프론트 설정.
 *
 * 백엔드 준비 전에도 플로우를 연결해 두고, 배포 시 .env 만 맞추면 됩니다.
 *
 * API (OpenAPI 기준):
 *  - 카카오 OAuth 시작: 프론트 Kakao JS SDK → redirectUri 로 code 발급
 *  - POST /auth/kakao/login { code, redirectUri } → LoginResponseDto
 *  - (신규 가입) POST /auth/kakao/signup { kakaoId, name?, nickname?, email? }
 *    phone/gender/ageGroup 미전송(null) → 마이페이지 PATCH
 */

import { API_BASE_URL } from "./api";

export { API_BASE_URL };

/** 인가 code → 토큰/프로필 교환 (POST only) */
export const KAKAO_CODE_LOGIN_PATH =
  process.env.REACT_APP_KAKAO_CODE_LOGIN_PATH || "/auth/kakao/login";

/** 카카오 가입 후 추가 정보 제출 (미구현 시 콜백에서만 분기) */
export const KAKAO_SIGNUP_PATH =
  process.env.REACT_APP_KAKAO_SIGNUP_PATH || "/auth/kakao/signup";

/** OAuth 완료 후 돌아올 프론트 URL (카카오/백엔드 콘솔에 등록 필요) */
export function getKakaoRedirectUri() {
  return (
    process.env.REACT_APP_KAKAO_REDIRECT_URI ||
    `${window.location.origin}/auth/kakao/callback`
  );
}

export { startKakaoLogin } from "../utils/kakaoSdk";
