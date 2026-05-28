import api from './axios';

/**
 * 인증 관련 API.
 * 백엔드 스펙: POST /auth/signup, POST /auth/login
 */

export function signup(payload) {
  return api.post('/auth/signup', payload).then((r) => r.data);
}

export function login(payload) {
  // 백엔드가 token을 ApiResponse.data 안에 담아 반환한다고 가정
  return api.post('/auth/login', payload).then((r) => r.data);
}
