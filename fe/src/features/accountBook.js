import { addComma } from '../utils/addComma';
import { extractNumber } from '../utils/extractNumber';

// 보고서 데이터 로딩 중 UI 표시 함수
export function showTransactionListLoading() {
  // DOM 요소 선택
  const transactionListTableBody = document.querySelector(
    '#transaction-list-table tbody',
  );

  // 로딩 중 텍스트 표시
  transactionListTableBody.innerHTML = '<span>loading ...</span>';
}

/**
 *  거래 데이터를 요청하는 함수
 */
async function fetchAccountTransaction(transactionType, date) {
  showTransactionListLoading();

  try {
    // fetch를 이용해 서버에 GET 요청을 보냅니다.
    const response = await fetch(
      `http://localhost:3000/account-transaction?type=${transactionType}&date=${date}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    reflectTransactionList(data);
  } catch (error) {
    console.error('Error fetching accountTransaction:', error);
  }
}

/**
 * 거래 데이터를 테이블에 표시하는 함수
 */
function reflectTransactionList(accountTransactions) {
  const transactionListTableBody = document.querySelector(
    '#transaction-list-table tbody',
  );

  // 기존 테이블 내용 초기화
  transactionListTableBody.innerHTML = '';

  // 거래 데이터 순회하며 테이블에 행 추가
  accountTransactions.forEach(transaction => {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.category}</td>
      <td>${transaction.description}</td>
      <td>${addComma(transaction.amount)} 원</td>
      <td>${transaction.type}</td>
    `;

    transactionListTableBody.appendChild(newRow);
  });

  // accountTransactions.forEach(transaction => {
  //   const row = document.createElement('tr');

  //   const dateCell = document.createElement('td');
  //   dateCell.textContent = transaction.date;
  //   dateCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

  //   const categoryCell = document.createElement('td');
  //   categoryCell.textContent = transaction.category;
  //   categoryCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

  //   const descriptionCell = document.createElement('td');
  //   descriptionCell.textContent = transaction.description;
  //   descriptionCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

  //   const amountCell = document.createElement('td');
  //   amountCell.textContent = transaction.amount;
  //   amountCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

  //   const incomeOutcomeCell = document.createElement('td');
  //   let value = '수입';

  //   if (transaction.income_outcome === -1) value = '지출';
  //   incomeOutcomeCell.textContent = value;
  //   incomeOutcomeCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

  //   row.appendChild(dateCell);
  //   row.appendChild(categoryCell);
  //   row.appendChild(descriptionCell);
  //   row.appendChild(amountCell);
  //   row.appendChild(incomeOutcomeCell);

  //   tableBody.appendChild(row);
  // });
}

// 숫자에 3자리마다 콤마를 추가합니다.
function inputNumberFormat(obj) {
  obj.value = comma(uncomma(obj.value));
}

// 현재 날짜 데이터를 UI에 반영하는 함수
function reflectDate() {
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
  reflectDate();

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

  // document.querySelectorAll('input[name="category"]').forEach(radio => {
  //   radio.addEventListener('change', event => {
  //     const selectedValue = event.target.value;
  //     let incomeOutcome = 0;

  //     if (selectedValue === 'income') incomeOutcome = 1;
  //     else if (selectedValue === 'outcome') incomeOutcome = -1;

  //     const month = document.getElementById('transaction-month').innerText;
  //     const year = document.getElementById('transaction-year').innerText;

  //     fetchAccountTransaction(incomeOutcome, year + '-' + month);
  //   });
  // });

  // document.getElementById('before-month').addEventListener('click', () => {
  //   let year = document.getElementById('transaction-year').innerText;
  //   let month = document.getElementById('transaction-month').innerText;
  //   if (month === '01') {
  //     year = Number(year) - 1;
  //     month = '12';
  //   } else month = Number(month) - 1;
  //   if (String(month).length == 1) month = '0' + month;

  //   const initialValue = document.querySelector(
  //     'input[name="category"]:checked',
  //   ).value;

  //   let incomeOutcome = 0;

  //   if (initialValue === 'income') incomeOutcome = 1;
  //   else if (initialValue === 'outcome') incomeOutcome = -1;

  //   fetchAccountTransaction(incomeOutcome, year + '-' + month);

  //   const monthCell = document.getElementById('transaction-month');
  //   const yearCell = document.getElementById('transaction-year');

  //   monthCell.innerHTML = month;
  //   yearCell.innerHTML = year;
  // });

  // document.getElementById('after-month').addEventListener('click', () => {
  //   let year = document.getElementById('transaction-year').innerText;
  //   let month = document.getElementById('transaction-month').innerText;
  //   if (month === '12') {
  //     year = Number(year) + 1;
  //     month = '01';
  //   } else month = Number(month) + 1;
  //   if (String(month).length == 1) month = '0' + month;

  //   const initialValue = document.querySelector(
  //     'input[name="category"]:checked',
  //   ).value;

  //   let incomeOutcome = 0;

  //   if (initialValue === 'income') incomeOutcome = 1;
  //   else if (initialValue === 'outcome') incomeOutcome = -1;

  //   fetchAccountTransaction(incomeOutcome, year + '-' + month);
  //   fetchAccountTransaction('0', year + '-' + month);

  //   const monthCell = document.getElementById('transaction-month');
  //   const yearCell = document.getElementById('transaction-year');

  //   monthCell.innerHTML = month;
  //   yearCell.innerHTML = year;
  // });
}

/**
 * 거래 폼을 제출하는 함수
 */
function submitForm() {
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

  // 제출할 데이터 객체 생성
  const body = {
    income_outcome: transactionType,
    category: transactionCategory,
    amount: transactionAmount,
    description: transactionDescription,
    date: transactionDate,
  };

  console.log(body); // 제출할 데이터 로그 출력
}

/**
 * 선택된 카테고리를 폼에 반영하는 함수
 */
function reflectCategory() {
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

    reflectCategory(); // 선택된 카테고리 반영

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
