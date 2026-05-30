/**
 * POST /auth/kakao/signup body (OpenAPI: KakaoSignupRequestDto)
 *
 * 필수: kakaoId (POST /auth/kakao/login 신규 응답에서 전달)
 * 선택: name, nickname, email
 * phone / gender / ageGroup 은 카카오 미제공 → 보내지 않음 (DB null, 마이페이지 PATCH)
 */
export function buildKakaoSignupPayload(profile = {}) {
  const kakaoId = profile.kakaoId;
  if (kakaoId == null || String(kakaoId).trim() === "") {
    throw new Error("KAKAO_ID_REQUIRED");
  }

  const payload = { kakaoId: String(kakaoId) };

  if (profile.name) payload.name = profile.name;
  if (profile.nickname) payload.nickname = profile.nickname;
  if (profile.email) payload.email = profile.email;

  return payload;
}
