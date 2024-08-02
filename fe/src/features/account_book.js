function fetchAccountTransaction() {
  fetch('http://localhost:3000/account_transaction')
    .then(response => response.json())
    .then(data => {
      populateTable(data);
    })
    .catch(error => {
      console.error('Error fetching accountTransaction:', error);
    });
}

function populateTable(accountTransactions) {
  const tableBody = document.getElementById('account_transaction_body');
  tableBody.innerHTML = '';

  accountTransactions.forEach(transaction => {
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = transaction.date;
    dateCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const categoryCell = document.createElement('td');
    categoryCell.textContent = transaction.category;
    categoryCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = transaction.description;
    descriptionCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const amountCell = document.createElement('td');
    amountCell.textContent = `${transaction.amount}원`;
    amountCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    row.appendChild(dateCell);
    row.appendChild(categoryCell);
    row.appendChild(descriptionCell);
    row.appendChild(amountCell);

    tableBody.appendChild(row);
  });
}

/**
 * 거래 폼을 제출하는 함수
 */
function submitForm() {
  // 선택된 거래 유형(수입/지출) 가져오기
  const transactionType = document.querySelector(
    'input[name="transaction-type"]:checked',
  ).value;

  // 폼에서 거래 정보 가져오기
  const transactionAmount = Number(
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
export function transactionFormInit() {
  const transactionForm = document.getElementById('transaction-form');
  const categoryForm = document.getElementById('category-form');
  const formCategoryButton = document.getElementById('form-category');

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
}
