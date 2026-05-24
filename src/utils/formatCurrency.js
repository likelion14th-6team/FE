/**
 * 숫자를 한국 원화 표기로 변환.
 *
 * @param {number} amount  금액 (양수로 들어옴)
 * @param {object} options
 *   - signed: true면 '-' 부호 prefix, false면 부호 없음. 기본 true (지출 가정)
 *
 * 예:
 *   formatCurrency(9000)                 // "-9,000원"
 *   formatCurrency(9000, { signed: false }) // "9,000원"
 *   formatCurrency(0)                    // "0원"
 */
export function formatCurrency(amount, { signed = true } = {}) {
  const num = Math.abs(amount).toLocaleString('ko-KR');
  if (amount === 0) return '0원';
  const prefix = signed ? '-' : '';
  return `${prefix}${num}원`;
}
