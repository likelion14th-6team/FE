import api from './axios';

/** GET /users/me — 현재 로그인 사용자 정보 */
export function fetchMe() {
  return api.get('/users/me').then((r) => r.data);
}

/** PATCH /users/me — 사용자 정보 수정 (별명/비밀번호 등) */
export function patchMe(payload) {
  return api.patch('/users/me', payload).then((r) => r.data);
}
