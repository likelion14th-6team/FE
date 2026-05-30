import { getKakaoRedirectUri } from "../config/oauth";

const KAKAO_SDK_URL =
  "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

function getKakaoJsKey() {
  return process.env.REACT_APP_KAKAO_JS_KEY?.trim() || "";
}

/** 카카오 JS SDK 스크립트 1회 로드 */
export function loadKakaoSdk() {
  if (window.Kakao) {
    return Promise.resolve(window.Kakao);
  }

  const existing = document.querySelector('script[data-kakao-sdk="true"]');
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(window.Kakao));
      existing.addEventListener("error", () =>
        reject(new Error("KAKAO_SDK_LOAD_FAILED")),
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-kakao-sdk", "true");
    script.onload = () => resolve(window.Kakao);
    script.onerror = () => reject(new Error("KAKAO_SDK_LOAD_FAILED"));
    document.head.appendChild(script);
  });
}

function ensureKakaoInitialized(Kakao) {
  const jsKey = getKakaoJsKey();
  if (!jsKey) {
    throw new Error("KAKAO_JS_KEY_MISSING");
  }
  if (!Kakao.isInitialized()) {
    Kakao.init(jsKey);
  }
}

/**
 * 카카오 로그인 시작.
 * 백엔드는 POST /auth/kakao/login 만 지원 → 카카오 OAuth는 JS SDK로 code 발급 후 콜백에서 POST.
 */
export async function startKakaoLogin() {
  try {
    const Kakao = await loadKakaoSdk();
    ensureKakaoInitialized(Kakao);

    const redirectUri = getKakaoRedirectUri();
    if (process.env.NODE_ENV === "development") {
      console.info("[kakao] authorize", {
        redirectUri,
        jsKeyPrefix: `${getKakaoJsKey().slice(0, 8)}...`,
        hint: "콘솔 Redirect URI·JS SDK 도메인·앱 멤버(초대 수락) 확인",
      });
    }

    Kakao.Auth.authorize({ redirectUri });
  } catch (err) {
    if (err.message === "KAKAO_JS_KEY_MISSING") {
      alert(
        "카카오 로그인 키가 없습니다.\n.env에 REACT_APP_KAKAO_JS_KEY를 설정한 뒤 npm start를 다시 실행해 주세요.",
      );
      return;
    }
    if (err.message === "KAKAO_SDK_LOAD_FAILED") {
      alert("카카오 SDK를 불러오지 못했습니다. 네트워크를 확인해 주세요.");
      return;
    }
    console.error("[kakao] authorize failed", err);
    alert("카카오 로그인을 시작할 수 없습니다. 잠시 후 다시 시도해 주세요.");
  }
}
