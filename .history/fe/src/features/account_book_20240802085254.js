document.addEventListener('DOMContentLoaded', () => {
  const testButton = document.getElementById('account_book_list');
  testButton.addEventListener('click', fetchCategories);
});

function fetchCategories() {
  fetch('/category')
    .then(response => response.json())
    .then(data => {
      populateTable(data);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}

function populateTable(categories) {
  const tableBody = document.getElementById('categories_table_body');
  tableBody.innerHTML = ''; // Clear existing rows

  categories.forEach(category => {
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = category.date; // Assuming the field is 'date'
    dateCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const categoryCell = document.createElement('td');
    categoryCell.textContent = category.category; // Assuming the field is 'category'
    categoryCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = category.description; // Assuming the field is 'description'
    descriptionCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    const amountCell = document.createElement('td');
    amountCell.textContent = `${category.amount}원`; // Assuming the field is 'amount'
    amountCell.style.cssText = 'border: 1px solid #ddd; padding: 8px';

    row.appendChild(dateCell);
    row.appendChild(categoryCell);
    row.appendChild(descriptionCell);
    row.appendChild(amountCell);

    tableBody.appendChild(row);
  });
}
