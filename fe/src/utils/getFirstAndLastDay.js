/**
 * 주어진 년도와 월의 첫 날과 마지막 날을 YYYY-MM-DD 형식으로 반환합니다.
 *
 * @param {number} year - 계산하려는 연도 (예: 2023)
 * @param {number} month - 계산하려는 월 (1-12)
 * @returns {Object} 첫 날과 마지막 날을 포함하는 객체
 * @property {string} firstDay - 해당 월의 첫 날 (YYYY-MM-DD 형식)
 * @property {string} lastDay - 해당 월의 마지막 날 (YYYY-MM-DD 형식)
 */
export function getFirstAndLastDay(year, month) {
  // 해당 월의 첫 날을 UTC 기준으로 구합니다.
  const firstDay = new Date(Date.UTC(year, month - 1, 1));

  // 다음 달의 0일 (즉, 이번 달의 마지막 날)을 UTC 기준으로 구합니다.
  const lastDay = new Date(Date.UTC(year, month, 0));

  return {
    firstDay: firstDay.toISOString().split('T')[0],
    lastDay: lastDay.toISOString().split('T')[0],
  };
}
