import { useMutation } from "@tanstack/react-query";

import { kakaoLoginWithCode } from "../api/auth";
import { startKakaoLogin } from "../config/oauth";

export { startKakaoLogin };

/**
 * 카카오 콜백에서 code → 토큰 교환.
 * 응답에 isNewUser / needsSignup 이 있으면 추가 가입 화면으로 보냄.
 */
export function useKakaoCodeLogin() {
  return useMutation({
    mutationFn: kakaoLoginWithCode,
  });
}

/** 신규 카카오 사용자 여부 (백엔드 필드명이 달라도 대응) */
export function isKakaoNewUser(data) {
  if (!data) return false;
  return Boolean(data.isNewUser ?? data.needsSignup ?? data.needSignup);
}
