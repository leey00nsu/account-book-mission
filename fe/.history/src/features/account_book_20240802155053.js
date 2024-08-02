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
