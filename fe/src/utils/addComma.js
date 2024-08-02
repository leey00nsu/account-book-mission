// 숫자에 3자리마다 콤마를 추가합니다.
export function addComma(number) {
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
