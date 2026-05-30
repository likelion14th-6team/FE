import api from "./axios";
import { KAKAO_CODE_LOGIN_PATH, KAKAO_SIGNUP_PATH } from "../config/oauth";

/**
 * 인증 관련 API.
 *
 * 구현됨: POST /auth/signup, POST /auth/login, POST /auth/refresh
 * 카카오: JS SDK authorize → POST /auth/kakao/login, POST /auth/kakao/signup
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

/**
 * 카카오 신규 가입.
 * phone / gender / ageGroup 은 null (카카오 미제공 → 마이페이지에서 PATCH).
 */
export function kakaoSignup(payload) {
  return api.post(KAKAO_SIGNUP_PATH, payload).then((r) => r.data);
}
