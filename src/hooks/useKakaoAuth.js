import { useMutation } from "@tanstack/react-query";

import { kakaoLoginWithCode, kakaoSignup } from "../api/auth";
import { startKakaoLogin } from "../config/oauth";

export { startKakaoLogin };

/**
 * 카카오 콜백에서 code → 토큰 교환.
 * 응답에 isNewUser / needsSignup 이 있으면 kakaoSignup 으로 가입 완료.
 */
export function useKakaoCodeLogin() {
  return useMutation({
    mutationFn: kakaoLoginWithCode,
  });
}

export function useKakaoSignup() {
  return useMutation({
    mutationFn: kakaoSignup,
  });
}

/**
 * 신규 카카오 사용자 여부 (KakaoLoginResponseDto.isNewUser)
 * 명세: true → kakaoId 등만 반환, signup 필요 / false → accessToken 반환
 */
export function isKakaoNewUser(data) {
  if (!data) return false;
  if (data.isNewUser === true) return true;
  if (data.isNewUser === false) return false;
  // 구버전/누락 대비: 토큰 없이 kakaoId만 온 경우
  return Boolean(data.kakaoId && !data.accessToken);
}
