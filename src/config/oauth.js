/**
 * 카카오 OAuth 프론트 설정.
 *
 * 백엔드 준비 전에도 플로우를 연결해 두고, 배포 시 .env 만 맞추면 됩니다.
 *
 * 예상 API (팀 명세 기준 — 경로는 env 로 덮어쓸 수 있음):
 *  - GET  /auth/kakao/login?redirectUri=...  → 카카오 인증 페이지로 리다이렉트
 *  - POST /auth/kakao/login { code, redirectUri } → LoginResponseDto (일반 로그인과 동일)
 *  - (신규 가입) POST /auth/kakao/signup — 추가 프로필 제출 시
 */

import { API_BASE_URL } from "./api";

export { API_BASE_URL };

/** 카카오 로그인 시작 (브라우저를 백엔드로 보냄) */
export const KAKAO_LOGIN_PATH =
  process.env.REACT_APP_KAKAO_LOGIN_PATH || "/auth/kakao/login";

/** 인가 코드 → 토큰 교환 */
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

/** 백엔드 카카오 로그인 URL (리다이렉트 방식) */
export function buildKakaoLoginUrl() {
  const redirectUri = getKakaoRedirectUri();
  const params = new URLSearchParams({ redirectUri });
  const base = API_BASE_URL.replace(/\/$/, "");
  const path = KAKAO_LOGIN_PATH.startsWith("/")
    ? KAKAO_LOGIN_PATH
    : `/${KAKAO_LOGIN_PATH}`;
  return `${base}${path}?${params.toString()}`;
}

export function startKakaoLogin() {
  window.location.assign(buildKakaoLoginUrl());
}
