import { addComma } from '../utils/addComma';
import { extractNumber } from '../utils/extractNumber';
import { HOST } from '../../host';

// 보고서 데이터 로딩 중 UI 표시 함수
export function showTransactionListLoading() {
  // DOM 요소 선택
  const transactionListTableBody = document.querySelector(
    '#transaction-list-table tbody',
  );

  // 로딩 중 텍스트 표시
  transactionListTableBody.innerHTML = `
  <tr>
    <td colspan='5'>
      <p class='text-center'>loading ...</p>
    </td>
  </tr>  
  `;
}

/**
 *  거래 데이터를 요청하는 함수
 */
async function fetchAccountTransaction(transactionType, date) {
  showTransactionListLoading();

  try {
    // fetch를 이용해 서버에 GET 요청을 보냅니다.
    const response = await fetch(
      `${HOST}/account-transaction?type=${transactionType}&date=${date}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    renderTransactionList(data);
  } catch (error) {
    console.error('Error fetching accountTransaction:', error);
  }
}
// 거래 데이터를 삽입하는 함수
async function inPutTransaction(data) {
  try {
    const response = await fetch(`${HOST}/account-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const type = getTransactionType();
    const date = getTransactionDate();

    fetchAccountTransaction(type, date);

    return result;
  } catch (error) {
    console.error('Error in inPutTransaction:', error);
    throw error;
  }
}

/**
 * 거래 데이터를 테이블에 표시하는 함수
 */
function renderTransactionList(accountTransactions) {
  const transactionListTableBody = document.querySelector(
    '#transaction-list-table tbody',
  );

  // 기존 테이블 내용 초기화
  transactionListTableBody.innerHTML = '';

  if (accountTransactions.length === 0) {
    transactionListTableBody.innerHTML = `
    <tr>
      <td colspan='5'>
        <p class='text-center'>거래 내역이 없습니다.</p>
      </td>
    </tr>
    `;

    return;
  }

  // 거래 데이터 순회하며 테이블에 행 추가
  accountTransactions.forEach(transaction => {
    const newRow = document.createElement('tr');
    const isIncome = transaction.type === '수입';
    const textClass = isIncome ? 'text-primary' : 'text-danger';

    newRow.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.category}</td>
      <td>${transaction.description}</td>
      <td>${addComma(transaction.amount)} 원</td>
      <td class=${textClass}>${transaction.type}</td>
    `;

    transactionListTableBody.appendChild(newRow);
  });
}

// 현재 날짜 데이터를 UI에 반영하는 함수
function renderDate() {
  const transactionDate = document.getElementById('transaction-date');

  // 오늘 날짜 가져오기
  let today = new Date();

  // 오늘 날짜를 'YYYY-MM' 형식으로 변환하여 폼에 반영
  transactionDate.value = today.toISOString().slice(0, 7);

  // 초기 데이터 요청
  fetchAccountTransaction('all', transactionDate.value);
}

// 이전 달로 이동하는 함수
function goPreviousMonth() {
  const transactionDate = document.getElementById('transaction-date');

  let currentDate = new Date(transactionDate.value);

  // 이전 달로 설정
  currentDate.setMonth(currentDate.getMonth() - 1);

  // 이전 달 날짜를 'YYYY-MM' 형식으로 변환하여 폼에 반영

  transactionDate.value = currentDate.toISOString().slice(0, 7);

  // change 이벤트 발생
  const event = new Event('change');
  transactionDate.dispatchEvent(event);
}

// 다음 달로 이동하는 함수
function goNextMonth() {
  const transactionDate = document.getElementById('transaction-date');

  let currentDate = new Date(transactionDate.value);

  // 다음 달로 설정
  currentDate.setMonth(currentDate.getMonth() + 1);

  // 다음 달 날짜를 'YYYY-MM' 형식으로 변환하여 폼에 반영

  transactionDate.value = currentDate.toISOString().slice(0, 7);

  // change 이벤트 발생
  const event = new Event('change');
  transactionDate.dispatchEvent(event);
}

/**
 * 현재 설정된 거래 유형을 가져오는 함수
 */
function getTransactionType() {
  const transactionType = document.querySelector(
    'input[name="transaction-type"]:checked',
  ).value;

  return transactionType;
}

/**
 *  현재 설정된 거래 날짜를 가져오는 함수
 */
function getTransactionDate() {
  const transactionDate = document.getElementById('transaction-date').value;

  return transactionDate;
}

function transactionListInit() {
  renderDate();

  // 이전 달 버튼 클릭 이벤트 리스너
  document.getElementById('previous-month').addEventListener('click', () => {
    goPreviousMonth();
  });

  // 다음 달 버튼 클릭 이벤트 리스너
  document.getElementById('next-month').addEventListener('click', () => {
    goNextMonth();
  });

  // 거래 날짜 변경 이벤트 리스너
  document
    .querySelector('#transaction-date')
    .addEventListener('change', event => {
      const currentType = getTransactionType();
      const currentDate = event.target.value;

      fetchAccountTransaction(currentType, currentDate);
    });

  // 거래 유형 변경 이벤트 리스너
  document
    .querySelector('#transaction-type-group')
    .addEventListener('change', event => {
      const currentType = event.target.value;
      const currentDate = getTransactionDate();

      fetchAccountTransaction(currentType, currentDate);
    });

  document.getElementById('report-button').addEventListener('click', () => {
    const currentDate = getTransactionDate();

    window.location.href = `/report?date=${currentDate}`;
  });
}

/**
 * 거래 폼을 제출하는 함수
 */
async function submitForm() {
  // 선택된 거래 유형(수입/지출) 가져오기
  const transactionType = document.querySelector(
    'input[name="form-transaction-type"]:checked',
  ).value;

  // 폼에서 거래 정보 가져오기
  const transactionAmount = extractNumber(
    document.querySelector('#form-amount').value,
  );
  const transactionDate = document.querySelector('#form-date').value;
  const transactionDescription =
    document.querySelector('#form-description').value;
  const transactionCategory = document.querySelector('#form-category').value;

  try {
    // 제출할 데이터 객체 생성
    const body = {
      type: transactionType,
      category: transactionCategory,
      amount: transactionAmount,
      description: transactionDescription,
      date: transactionDate,
    };

    await inPutTransaction(body);
  } catch (error) {
    console.error('Error in performTransactionAndFetch:', error);
  }
}

/**
 * 선택된 카테고리를 폼에 반영하는 함수
 */
function renderCategory() {
  // 선택된 카테고리 유형 가져오기
  const categoryType = document.querySelector(
    'input[name="category-type"]:checked',
  ).value;
  const formCategory = document.getElementById('form-category');

  // 폼의 카테고리 필드에 선택된 카테고리 반영
  formCategory.value = categoryType;
}

/**
 * 카테고리 선택 모달을 여는 함수
 */
function openModal() {
  const dialog = document.getElementById('category-modal');
  dialog.showModal(); // 모달 열기
}

/**
 * 카테고리 선택 모달을 닫는 함수
 */
function closeModal() {
  const dialog = document.getElementById('category-modal');
  dialog.close(); // 모달 닫기
}

/**
 * 거래 폼 초기화 및 이벤트 리스너 설정 함수
 */
function transactionFormInit() {
  const transactionForm = document.getElementById('transaction-form');
  const categoryForm = document.getElementById('category-form');
  const formCategoryButton = document.getElementById('form-category');
  const amountInput = document.getElementById('form-amount');

  // 카테고리 폼 제출 이벤트 리스너
  categoryForm.addEventListener('submit', e => {
    e.preventDefault(); // 기본 제출 동작 방지

    renderCategory(); // 선택된 카테고리 반영

    closeModal(); // 모달 닫기
  });

  // 거래 폼 제출 이벤트 리스너
  transactionForm.addEventListener('submit', e => {
    e.preventDefault(); // 기본 제출 동작 방지

    submitForm(); // 폼 제출 함수 호출
  });

  // 카테고리 버튼 클릭 이벤트 리스너
  formCategoryButton.addEventListener('click', () => {
    openModal(); // 카테고리 선택 모달 열기
  });

  // 금액 입력 필드 입력 이벤트 리스너
  amountInput.addEventListener('input', e => {
    e.target.value = addComma(extractNumber(e.target.value)) + ' 원';
  });
}

export function accountBookInit() {
  transactionListInit();
  transactionFormInit();
}
