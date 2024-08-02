document.addEventListener('DOMContentLoaded', () => {
  fetchCategories();
});

function fetchAccountTransaction() {
  fetch('/http://localhost:3000/account_transaction')
    .then(response => response.json())
    .then(data => {
      populateTable(data);
    })
    .catch(error => {
      console.error('Error fetching accountTransaction:', error);
    });
}

function populateTable(account_transaction) {
  const tableBody = document.getElementById('account_transaction_body');
  tableBody.innerHTML = ''; // Clear existing rows

  account_transaction.forEach(account_transaction => {
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = account_transaction.date; // Assuming the field is 'date'
    dateCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const account_transaction = document.createElement('td');
    categoryCell.textContent = account_transaction.category; // Assuming the field is 'category'
    categoryCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = account_transaction.description; // Assuming the field is 'description'
    descriptionCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const amountCell = document.createElement('td');
    amountCell.textContent = `${account_transaction.amount}원`; // Assuming the field is 'amount'
    amountCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    row.appendChild(dateCell);
    row.appendChild(categoryCell);
    row.appendChild(descriptionCell);
    row.appendChild(amountCell);

    tableBody.appendChild(row);
  });
}
