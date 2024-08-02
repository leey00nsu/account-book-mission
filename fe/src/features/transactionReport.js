import { addComma } from '../utils/addComma';

const MOCK_TRANSACTION_REPORT = {
  profit: 6375000,
  totalIncome: 7130000,
  totalOutcome: 755000,
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
  outcomes: [
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

// 거래 보고서 데이터를 가져오는 함수
export function getTransactionReportData() {
  // 실제 데이터 fetch 추가 (현재는 구현되지 않음)

  // 목업 데이터를 사용하여 비동기 작업 시뮬레이션
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_TRANSACTION_REPORT);
    }, 2000);
  });
}

// 보고서 데이터 로딩 중 UI 표시 함수
export function showReportDataLoading() {
  // DOM 요소 선택
  const totalOutcome = document.getElementById('total-outcome');
  const totalIncome = document.getElementById('total-income');
  const incomeListTableBody = document.querySelector(
    '#income-report-table tbody',
  );
  const outcomeListTableBody = document.querySelector(
    '#outcome-report-table tbody',
  );

  // 로딩 중 텍스트 표시
  totalIncome.innerHTML = '<span>loading ...</span>';
  totalOutcome.innerHTML = '<span>loading ...</span>';
  incomeListTableBody.innerHTML = '<span>loading ...</span>';
  outcomeListTableBody.innerHTML = '<span>loading ...</span>';
}

// 거래 보고서 데이터를 UI에 반영하는 함수
export function reflectTransactionReport(data) {
  // DOM 요소 선택
  const totalIncome = document.getElementById('total-income');
  const totalOutcome = document.getElementById('total-outcome');
  const incomeListTableBody = document.querySelector(
    '#income-report-table tbody',
  );
  const outcomeListTableBody = document.querySelector(
    '#outcome-report-table tbody',
  );

  // 총 수입과 지출 표시 (천 단위 구분자 추가)
  totalIncome.innerHTML = `<span>${addComma(data.totalIncome)}</span>`;
  totalOutcome.innerHTML = `<span>${addComma(data.totalOutcome)}</span>`;

  // 기존 테이블 내용 초기화
  incomeListTableBody.innerHTML = '<span></span>';
  outcomeListTableBody.innerHTML = '<span></span>';

  // 수입 데이터 순회하며 테이블에 행 추가
  data.incomes.forEach(income => {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>${income.category_title}</td>
      <td>${addComma(income.amount)}</td>
    `;

    incomeListTableBody.appendChild(newRow);
  });

  // 지출 데이터 순회하며 테이블에 행 추가
  data.outcomes.forEach(outcome => {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>${outcome.category_title}</td>
      <td>${addComma(outcome.amount)}</td>
    `;

    outcomeListTableBody.appendChild(newRow);
  });
}
