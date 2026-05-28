import axios from "axios";

/**
 * 백엔드 API용 axios 인스턴스.
 *
 * - baseURL: http://slog.z0.co.kr/api/v1
 * - 요청 인터셉터: localStorage 토큰 → Authorization 헤더 자동 첨부
 * - 응답 인터셉터: ApiResponse 래퍼({success, code, message, data})를 자동 풀어서
 *   `response.data`에 실제 data만 담음. 사용처에선 그냥 `res.data`로 받으면 됨.
 *
 * 인증 정책 TBD: 추후 AuthContext 도입 시 토큰을 Context에서 가져오도록 변경 가능.
 */
const api = axios.create({
  // https로 호출해야 함. http로 보내면 서버가 https로 리다이렉트하면서
  // preflight(OPTIONS) 단계에서 브라우저가 CORS 에러로 차단함.
  baseURL: "https://slog.z0.co.kr/api/v1",
  timeout: 10000,
});

// === 요청 인터셉터: JWT 자동 첨부 ===
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === 응답 인터셉터: ApiResponse 래퍼 풀기 ===
api.interceptors.response.use(
  (response) => {
    // 백엔드가 항상 { success, code, message, data } 형태로 반환.
    // data 안의 실제 페이로드만 response.data에 다시 담는다.
    const payload = response.data;
    console.log("[api response]", response.config.url, payload);
    if (
      payload &&
      typeof payload === "object" &&
      "success" in payload &&
      "data" in payload
    ) {
      return { ...response, data: payload.data, raw: payload };
    }
    return response;
  },
  (error) => {
    // 진단용 — 콘솔에 상세 에러 출력
    if (error.response) {
      console.error("[api error]", error.response.status, {
        url: error.config?.url,
        method: error.config?.method,
        requestBody: error.config?.data,
        responseBody: error.response.data,
      });
    } else {
      console.error("[api error] no response", error.message);
    }
    // 401: 토큰 만료/무효 → 로컬 토큰 제거
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // TODO(AuthContext): 로그인 페이지로 이동 트리거
    }
    return Promise.reject(error);
  },
);

export default api;
