import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";

import MobileLayout from "../components/common/MobileLayout";
import Mochi from "../components/common/Mochi";
import { getKakaoRedirectUri } from "../config/oauth";
import {
  isKakaoNewUser,
  useKakaoCodeLogin,
  useKakaoSignup,
} from "../hooks/useKakaoAuth";
import { saveLoginTokens } from "../hooks/useAuth";
import { buildKakaoSignupPayload } from "../utils/kakaoSignup";

function getErrorMessage(err, fallback) {
  const body = err?.response?.data;
  return body?.message || body?.raw?.message || err?.message || fallback;
}

function finishLogin(data, { qc, navigate }) {
  if (saveLoginTokens(data)) {
    qc.invalidateQueries({ queryKey: ["me"] });
    qc.invalidateQueries({ queryKey: ["budgets"] });
    navigate("/", { replace: true });
    return true;
  }
  return false;
}

/**
 * 카카오 OAuth 콜백.
 *
 * 1) 백엔드가 토큰을 쿼리로 넘기는 경우: ?accessToken=&refreshToken=
 * 2) code → POST /auth/kakao/login
 *    - 기존 회원: 토큰 발급 후 메인
 *    - 신규 회원: POST /auth/kakao/signup (phone/gender/ageGroup = null) 후 메인
 */
function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qc = useQueryClient();
  const kakaoLogin = useKakaoCodeLogin();
  const kakaoSignup = useKakaoSignup();
  const handled = useRef(false);
  const statusText = "카카오 로그인 처리 중...";

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const oauthError =
      searchParams.get("error") || searchParams.get("error_description");
    if (oauthError) {
      alert(`카카오 로그인이 취소되었거나 실패했습니다.\n${oauthError}`);
      navigate("/login", { replace: true });
      return;
    }

    const accessToken = searchParams.get("accessToken");
    if (accessToken) {
      saveLoginTokens({
        accessToken,
        refreshToken: searchParams.get("refreshToken") || undefined,
      });
      qc.invalidateQueries({ queryKey: ["me"] });
      navigate("/", { replace: true });
      return;
    }

    const code = searchParams.get("code");
    if (!code) {
      alert("카카오 인증 정보가 없습니다. 다시 시도해주세요.");
      navigate("/login", { replace: true });
      return;
    }

    const redirectUri = getKakaoRedirectUri();

    const handleAuthFailure = (err) => {
      const status = err.response?.status;
      if (status === 404 || status === 501) {
        alert(
          "카카오 로그인 API가 아직 준비되지 않았습니다.\n백엔드 배포 후 다시 시도해주세요.",
        );
      } else {
        alert(
          "카카오 로그인 실패: " + getErrorMessage(err, "다시 시도해주세요."),
        );
      }
      navigate("/login", { replace: true });
    };

    kakaoLogin
      .mutateAsync({ code, redirectUri })
      .then(async (data) => {
        if (!isKakaoNewUser(data)) {
          if (finishLogin(data, { qc, navigate })) return;
          alert("로그인 응답에 토큰이 없습니다. 백엔드 연동을 확인해주세요.");
          navigate("/login", { replace: true });
          return;
        }

        let signupPayload;
        try {
          signupPayload = buildKakaoSignupPayload(data);
        } catch {
          alert(
            "카카오 회원 정보(kakaoId)를 받지 못했습니다.\n로그인 API 응답을 확인해 주세요.",
          );
          navigate("/login", { replace: true });
          return;
        }

        const signupData = await kakaoSignup.mutateAsync(signupPayload);

        if (finishLogin(signupData, { qc, navigate })) return;

        alert("가입은 완료됐지만 토큰을 받지 못했습니다. 로그인해 주세요.");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 400) {
          const msg = getErrorMessage(err, "입력값을 확인해 주세요.");
          alert(
            `카카오 가입 요청이 올바르지 않습니다.\n${msg}\n(kakaoId 필수 — login 응답 확인)`,
          );
          navigate("/login", { replace: true });
          return;
        }
        handleAuthFailure(err);
      });
  }, [kakaoLogin, kakaoSignup, navigate, qc, searchParams]);

  return (
    <MobileLayout $hasBottomNav={false}>
      <Page>
        <Mochi expression="happy_wave" size="lg" />
        <Message>{statusText}</Message>
        {(kakaoLogin.isPending || kakaoSignup.isPending) && (
          <Hint>잠시만 기다려주세요</Hint>
        )}
      </Page>
    </MobileLayout>
  );
}

export default KakaoCallback;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: calc(100vh - 52px);
  padding: 40px 20px;
`;

const Message = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.brand};
  text-align: center;
`;

const Hint = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.gray};
`;
