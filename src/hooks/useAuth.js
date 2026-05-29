import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useSyncExternalStore } from "react";

import { login as loginApi, signup as signupApi } from "../api/auth";

/**
 * 인증 훅 모음.
 *
 * 토큰 저장소: localStorage
 *  - TOKEN_KEY:          access token (axios 인터셉터가 자동으로 헤더에 첨부)
 *  - REFRESH_TOKEN_KEY:  refresh token (추후 토큰 갱신용)
 *
 * - useAuthState():  현재 토큰/로그인 여부 (스토리지 변경 자동 반응)
 * - useLogin():      mutation — { username, password } → 토큰 저장
 * - useSignup():     mutation — 회원가입 (자동 로그인 X)
 * - useLogout():     함수 — 토큰 + 캐시 비우기
 *
 * 추후 AuthContext 도입 시 useAuthState를 Context로 옮길 수 있음.
 */

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";

/* ===== 토큰 헬퍼 ===== */

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * 로그인/카카오 콜백 등에서 받은 LoginResponseDto 를 저장.
 * @returns {boolean} accessToken 저장 여부
 */
export function saveLoginTokens(data) {
  if (!data?.accessToken) return false;
  setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
  return true;
}

function setTokens({ accessToken, refreshToken }) {
  console.log("[setTokens] saving tokens", {
    accessToken: !!accessToken,
    refreshToken: !!refreshToken,
  });
  localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  // 같은 탭에서도 useAuthState가 반응하도록 storage 이벤트 발사
  window.dispatchEvent(new Event("auth-changed"));
  console.log(
    "[setTokens] done. token in storage:",
    localStorage.getItem(TOKEN_KEY) ? "YES" : "NO",
  );
}

function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.dispatchEvent(new Event("auth-changed"));
}

/* ===== useAuthState: 현재 로그인 여부 구독 ===== */

function subscribe(callback) {
  // 다른 탭에서 변경 + 같은 탭의 명시적 이벤트 둘 다 구독
  window.addEventListener("storage", callback);
  window.addEventListener("auth-changed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("auth-changed", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * useAuthState — 토큰 + 로그인 여부 반응형 구독.
 *
 * const { token, isAuthenticated } = useAuthState();
 */
export function useAuthState() {
  const token = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return {
    token,
    isAuthenticated: !!token,
  };
}

/* ===== useLogin ===== */

export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("[useLogin] success response:", data);
      if (saveLoginTokens(data)) {
        qc.invalidateQueries({ queryKey: ["me"] });
        qc.invalidateQueries({ queryKey: ["budgets"] });
      } else {
        console.warn(
          "[useLogin] accessToken not found in response. data keys:",
          Object.keys(data || {}),
        );
      }
    },
  });
}

/* ===== useSignup ===== */

export function useSignup() {
  return useMutation({
    mutationFn: signupApi,
    // 백엔드가 회원가입 시 토큰을 안 주므로 자동 로그인 X.
    // 사용처에서 onSuccess로 login 화면 이동 또는 자동 로그인 처리.
  });
}

/* ===== useLogout ===== */

/**
 * useLogout — 로그아웃 함수 반환.
 *
 * const logout = useLogout();
 * <button onClick={logout}>로그아웃</button>
 *
 * - 토큰 + 모든 캐시 비움
 */
export function useLogout() {
  const qc = useQueryClient();

  return useCallback(() => {
    clearTokens();
    qc.clear();
  }, [qc]);
}
