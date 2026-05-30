import api from "./axios";
import { KAKAO_CODE_LOGIN_PATH, KAKAO_SIGNUP_PATH } from "../config/oauth";

/**
 * 인증 관련 API.
 *
 * 구현됨: POST /auth/signup, POST /auth/login, POST /auth/refresh
 * 예정(카카오): GET /auth/kakao/login, POST /auth/kakao/login, POST /auth/kakao/signup
 */

export function signup(payload) {
  return api.post("/auth/signup", payload).then((r) => r.data);
}

export function login(payload) {
  return api.post("/auth/login", payload).then((r) => r.data);
}

/** 아이디 중복 확인 */
export function checkUsername(username) {
  return api
    .get("/auth/check-username", { params: { username } })
    .then((r) => ({ data: r.data, raw: r.raw }));
}

/** 카카오 인가 코드로 로그인 (LoginResponseDto) */
export function kakaoLoginWithCode({ code, redirectUri }) {
  return api
    .post(KAKAO_CODE_LOGIN_PATH, { code, redirectUri })
    .then((r) => r.data);
}

/** 카카오 신규 가입 — 추가 프로필 제출 (백엔드 스펙 확정 후 필드 조정) */
export function kakaoSignup(payload) {
  return api.post(KAKAO_SIGNUP_PATH, payload).then((r) => r.data);
}
