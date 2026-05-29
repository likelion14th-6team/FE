/**
 * API 에러 메시지 추출.
 * - ApiResponse: { message }
 * - Spring 기본: { message, error, status }
 */
export function getApiErrorMessage(err, fallback = "요청에 실패했습니다.") {
  const data = err?.response?.data;
  if (!data) return err?.message || fallback;
  return data.message || data.raw?.message || fallback;
}
