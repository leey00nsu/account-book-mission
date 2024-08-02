document.addEventListener('DOMContentLoaded', () => {
  fetchAccountTransaction();
});

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
  // 매개변수 이름 변경
  const tableBody = document.getElementById('account_transaction_body');
  tableBody.innerHTML = ''; // 기존 행 제거

  accountTransactions.forEach(transaction => {
    // 변수명 변경
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = transaction.date; // 필드가 'date'
    dateCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const categoryCell = document.createElement('td'); // 변수명 변경
    categoryCell.textContent = transaction.category; // 필드가 'category'
    categoryCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = transaction.description; // 필드가 'description'
    descriptionCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const amountCell = document.createElement('td');
    amountCell.textContent = `${transaction.amount}원`; // 필드가 'amount'
    amountCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    row.appendChild(dateCell);
    row.appendChild(categoryCell);
    row.appendChild(descriptionCell);
    row.appendChild(amountCell);

    tableBody.appendChild(row);
  });
}
