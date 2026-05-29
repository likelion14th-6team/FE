import api from './axios';

/**
 * GET /users/me — 내 정보 조회
 * @returns {Promise<UserMeResponse>}
 */
export function fetchMe() {
  return api.get('/users/me').then((r) => r.data);
}

/**
 * PATCH /users/me — 내 정보 수정
 * @param {Object} payload - nickname, email, phone, gender, ageGroup, currentPassword, newPassword
 */
export function patchMe(payload) {
  return api.patch('/users/me', payload).then((r) => r.data);
}
