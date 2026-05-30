/**
 * API base URL (axios, 카카오 OAuth 공통).
 *
 * .env 예시:
 *   REACT_APP_API_URL=https://slog.z0.co.kr
 *   REACT_APP_API_BASE_URL=https://slog.z0.co.kr/api/v1
 */
const DEFAULT_ORIGIN = "https://slog.z0.co.kr";

function resolveApiBaseUrl() {
  const raw =
    process.env.REACT_APP_API_BASE_URL ||
    process.env.REACT_APP_API_URL ||
    DEFAULT_ORIGIN;

  let url = String(raw).trim().replace(/\/$/, "");

  if (url.endsWith("/api/v1")) return url;
  if (url.endsWith("/api")) return `${url}/v1`;
  return `${url}/api/v1`;
}

export const API_BASE_URL = resolveApiBaseUrl();
