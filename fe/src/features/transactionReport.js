import { addComma } from '../utils/addComma';
import { getFirstAndLastDay } from '../utils/getFirstAndLastDay';

const MOCK_TRANSACTION_REPORT = {
  profit: 6375000,
  totalIncome: 7130000,
  totalExpense: 755000,
  incomes: [
    {
      idx: 1,
      amount: 3000000,
      description: '월급',
      date: '2024-08-05T09:00:00+09:00',
      category_idx: 1,
      category_title: '급여',
    },
    {
      idx: 2,
      amount: 500000,
      description: '프리랜서 프로젝트 수입',
      date: '2024-08-10T14:30:00+09:00',
      category_idx: 2,
      category_title: '부업',
    },
    {
      idx: 3,
      amount: 100000,
      description: '주식 배당금',
      date: '2024-08-15T10:00:00+09:00',
      category_idx: 3,
      category_title: '투자수익',
    },
    {
      idx: 4,
      amount: 1000000,
      description: '전세 보증금 반환',
      date: '2024-08-18T11:00:00+09:00',
      category_idx: 4,
      category_title: '기타수입',
    },
    {
      idx: 5,
      amount: 200000,
      description: '유튜브 광고 수익',
      date: '2024-08-20T15:00:00+09:00',
      category_idx: 5,
      category_title: '온라인수입',
    },
    {
      idx: 6,
      amount: 50000,
      description: '중고 물품 판매',
      date: '2024-08-22T18:30:00+09:00',
      category_idx: 6,
      category_title: '중고거래',
    },
    {
      idx: 7,
      amount: 300000,
      description: '이자 수입',
      date: '2024-08-25T09:30:00+09:00',
      category_idx: 3,
      category_title: '투자수익',
    },
    {
      idx: 8,
      amount: 1500000,
      description: '연간 보너스',
      date: '2024-08-28T14:00:00+09:00',
      category_idx: 1,
      category_title: '급여',
    },
    {
      idx: 9,
      amount: 400000,
      description: '임대 수익',
      date: '2024-08-30T10:00:00+09:00',
      category_idx: 7,
      category_title: '부동산수입',
    },
    {
      idx: 10,
      amount: 80000,
      description: '환급금',
      date: '2024-08-31T16:45:00+09:00',
      category_idx: 4,
      category_title: '기타수입',
    },
  ],
  expenses: [
    {
      idx: 1,
      amount: 50000,
      description: '식료품 구매',
      date: '2024-08-02T14:30:00+09:00',
      category_idx: 1,
      category_title: '식비',
    },
    {
      idx: 2,
      amount: 15000,
      description: '영화 관람',
      date: '2024-08-03T19:45:00+09:00',
      category_idx: 2,
      category_title: '엔터테인먼트',
    },
    {
      idx: 3,
      amount: 200000,
      description: '월세',
      date: '2024-08-05T09:00:00+09:00',
      category_idx: 3,
      category_title: '주거',
    },
    {
      idx: 4,
      amount: 30000,
      description: '택시 요금',
      date: '2024-08-07T22:15:00+09:00',
      category_idx: 4,
      category_title: '교통',
    },
    {
      idx: 5,
      amount: 100000,
      description: '새 옷 구매',
      date: '2024-08-10T13:20:00+09:00',
      category_idx: 5,
      category_title: '의류',
    },
    {
      idx: 6,
      amount: 80000,
      description: '병원 진료비',
      date: '2024-08-12T11:00:00+09:00',
      category_idx: 6,
      category_title: '의료',
    },
    {
      idx: 7,
      amount: 20000,
      description: '커피숍',
      date: '2024-08-15T16:30:00+09:00',
      category_idx: 1,
      category_title: '식비',
    },
    {
      idx: 8,
      amount: 150000,
      description: '휴대폰 요금',
      date: '2024-08-18T10:00:00+09:00',
      category_idx: 7,
      category_title: '통신',
    },
    {
      idx: 9,
      amount: 70000,
      description: '책 구매',
      date: '2024-08-20T14:45:00+09:00',
      category_idx: 8,
      category_title: '교육',
    },
    {
      idx: 10,
      amount: 40000,
      description: '헬스장 회원권',
      date: '2024-08-25T18:00:00+09:00',
      category_idx: 9,
      category_title: '건강',
    },
  ],
};

/**
 *  거래 보고서 데이터를 요청하는 더미 함수
 */
function mockFetchTransactionReport() {
  // 목업 데이터를 사용하여 비동기 작업 시뮬레이션
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_TRANSACTION_REPORT);
    }, 2000);
  });
}

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
  incomeListTableBody.innerHTML = '<span>loading ...</span>';
  expenseListTableBody.innerHTML = '<span>loading ...</span>';
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
  incomeListTableBody.innerHTML = '<span></span>';
  expenseListTableBody.innerHTML = '<span></span>';

  // 수입 데이터 순회하며 테이블에 행 추가
  data.incomes.forEach(income => {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>${income.category}</td>
      <td>${addComma(income.amount)} 원</td>
    `;

    incomeListTableBody.appendChild(newRow);
  });

  // 지출 데이터 순회하며 테이블에 행 추가
  data.expenses.forEach(expense => {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>${expense.category}</td>
      <td>${addComma(expense.amount)} 원</td>
    `;

    expenseListTableBody.appendChild(newRow);
  });

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
