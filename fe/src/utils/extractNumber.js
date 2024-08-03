/**
 * 문자열에서 문자열을 제외한 숫자를 반환합니다.
 */
export function extractNumber(str) {
  return Number(str.replace(/[^0-9]/g, ''));
}
