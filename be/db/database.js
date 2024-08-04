const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 연결 (없으면 생성됨)
const db = new sqlite3.Database('mydatabase.db', err => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err.message);
  } else {
    console.log('데이터베이스 연결 성공');
  }
});

// account_transaction 테이블 생성
db.run(
  `CREATE TABLE IF NOT EXISTS account_transaction (
    idx INTEGER PRIMARY KEY AUTOINCREMENT,
    income_expense INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    description TEXT,
    date TEXT,
    category TEXT
)`,
  err => {
    if (err) {
      console.error('account_transaction 테이블 생성 오류:', err.message);
    } else {
      console.log('account_transaction 테이블 생성 성공');
    }
  },
);

function getAccountTransaction(type, date, callback) {
  let query = 'SELECT * FROM account_transaction where 1=1';

  if (type !== 'all') {
    const income_expense = type === 'income' ? 1 : 0;

    query += ` AND income_expense = ${income_expense}`;
  }

  if (date !== null && date !== undefined) {
    query += ` AND date like '${date}%'`;
  }

  // 날짜별로 정렬
  query += ' ORDER BY date ASC';

  console.log(query);

  db.all(query, (err, rows) => {
    if (err) {
      console.error('account_transaction 테이블 조회 오류:', err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

function getTransactionReport(date, callback) {
  const query = `
    SELECT income_expense, category, SUM(amount) as total_amount
    FROM account_transaction
    WHERE date LIKE ?
    GROUP BY income_expense, category
`;

  db.all(query, [date + '%'], (err, rows) => {
    if (err) {
      console.error('account_transaction 테이블 조회 오류:', err.message);
      callback(err, null);
    }

    // 결과를 incomes와 expenses로 나누어 분류
    // totalIncome, totalExpense, profit 계산
    const report = { incomes: [], expenses: [] };

    rows.forEach(row => {
      const type = row.income_expense === 1 ? 'incomes' : 'expenses';

      report[type].push({
        category: row.category,
        amount: row.total_amount,
      });
    });

    const totalIncome = report.incomes.reduce(
      (acc, income) => acc + income.amount,
      0,
    );

    const totalExpense = report.expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0,
    );

    const profit = totalIncome - totalExpense;

    callback(null, {
      totalIncome,
      totalExpense,
      incomes: report.incomes,
      expenses: report.expenses,
      profit,
    });
  });
}

function insertTransaction(transaction, callback) {
  db.run(
    `INSERT INTO account_transaction (income_expense, date, amount, category, description) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      transaction.type,
      transaction.date,
      transaction.amount,
      transaction.category,
      transaction.description,
    ],
    function (err) {
      if (err) {
        console.error('데이터 삽입 오류:', err.message);
        return callback(err, null); // 오류 발생 시 콜백 호출
      }
      console.log(`데이터 삽입 성공: 행 ID ${this.lastID}`);
      return callback(null, this.lastID); // 성공 시 삽입된 행 ID 전달
    },
  );
}

// 모듈 내보내기
module.exports = {
  getAccountTransaction,
  getTransactionReport,
  insertTransaction,
};
