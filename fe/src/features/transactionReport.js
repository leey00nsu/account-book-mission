import { addComma } from '../utils/addComma';
import { getFirstAndLastDay } from '../utils/getFirstAndLastDay';

/**
 *  거래 보고서 데이터를 요청하는 함수
 */
async function fetchTransactionReport() {
  showReportDataLoading();

  const date = getDate();

  try {
    // fetch를 이용해 서버에 GET 요청을 보냅니다.
    const response = await fetch(`http://localhost:3000/report?date=${date}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching accountTransaction:', error);
  }
}

// 보고서 데이터 로딩 중 UI 표시 함수
function showReportDataLoading() {
  // DOM 요소 선택
  const totalexpense = document.getElementById('total-expense');
  const totalIncome = document.getElementById('total-income');
  const incomeListTableBody = document.querySelector(
    '#income-report-table tbody',
  );
  const expenseListTableBody = document.querySelector(
    '#expense-report-table tbody',
  );
  const summaryProfit = document.getElementById('summary-profit');

  // 로딩 중 텍스트 표시
  totalIncome.innerHTML = '<span>loading ...</span>';
  totalexpense.innerHTML = '<span>loading ...</span>';
  incomeListTableBody.innerHTML = `<tr>
      <td colspan='5'>
        <p class='text-center'>loading ...</p>
      </td>
    </tr>  `;
  expenseListTableBody.innerHTML = `<tr>
      <td colspan='5'>
        <p class='text-center'>loading ...</p>
      </td>
    </tr>  `;
  summaryProfit.innerHTML = '<span>loading ...</span>';
}

// 거래 보고서 데이터를 UI에 반영하는 함수
function renderTransactionReport(data) {
  // DOM 요소 선택
  const totalIncome = document.getElementById('total-income');
  const totalExpense = document.getElementById('total-expense');
  const incomeListTableBody = document.querySelector(
    '#income-report-table tbody',
  );
  const expenseListTableBody = document.querySelector(
    '#expense-report-table tbody',
  );
  const summaryProfit = document.getElementById('summary-profit');

  // 총 수입과 지출 표시 (천 단위 구분자 추가)
  totalIncome.innerHTML = `<span>${addComma(data.totalIncome)} 원</span>`;
  totalExpense.innerHTML = `<span>${addComma(data.totalExpense)} 원</span>`;

  // 기존 테이블 내용 초기화
  incomeListTableBody.innerHTML = '';
  expenseListTableBody.innerHTML = '';

  // 수입 데이터 순회하며 테이블에 행 추가
  data.incomes.forEach(income => {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>${income.category}</td>
      <td>${addComma(income.amount)} 원</td>
    `;

    incomeListTableBody.appendChild(newRow);
  });

  if (data.incomes.length === 0) {
    incomeListTableBody.innerHTML = `
    <tr>
      <td colspan='5'>
        <p class='text-center'>거래 내역이 없습니다.</p>
      </td>
    </tr>
    `;
  }

  // 지출 데이터 순회하며 테이블에 행 추가
  data.expenses.forEach(expense => {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>${expense.category}</td>
      <td>${addComma(expense.amount)} 원</td>
    `;

    expenseListTableBody.appendChild(newRow);
  });

  if (data.expenses.length === 0) {
    expenseListTableBody.innerHTML = `
    <tr>
      <td colspan='5'>
        <p class='text-center'>거래 내역이 없습니다.</p>
      </td>
    </tr>
    `;
  }

  summaryProfit.innerHTML = `<span>${addComma(data.profit)} 원</span>`;
}

/**
 * URL 쿼리 파라미터에서 'date'를 가져와 변환합니다.
 * 입력 날짜는 'YYYY-MM' 형식이어야 합니다.
 * @returns {string} 날짜 문자열 (YYYY-MM)
 */
function getDate() {
  // URL의 쿼리 파라미터를 파싱합니다.
  const urlSearch = new URLSearchParams(location.search);

  // 'date' 파라미터 값을 가져옵니다.
  const inputDate = urlSearch.get('date');

  return inputDate;
}

// 날짜 데이터를 UI에 반영하는 함수
function renderDate() {
  const [currentYear, currentMonth] = getDate().split('-');
  const { firstDay, lastDay } = getFirstAndLastDay(
    Number(currentYear),
    Number(currentMonth),
  );

  const reportStartDate = document.getElementById('report-start-date');
  const reportEndDate = document.getElementById('report-end-date');

  // 시작 날짜와 종료 날짜 표시
  reportStartDate.innerHTML = `<span>${firstDay}</span>`;
  reportEndDate.innerHTML = `<span>${lastDay}</span>`;
}

/**
 * 거래 보고서 페이지 초기화 함수
 */
export async function reportInit() {
  renderDate();

  // 거래 보고서 데이터를 비동기적으로 가져옵니다.
  const data = await fetchTransactionReport();

  // 가져온 데이터를 UI에 반영합니다.
  renderTransactionReport(data);
}
