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
    income_outcome INTEGER NOT NULL,
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
    const income_outcome = type === 'income' ? 1 : 0;

    query += ` AND income_outcome = ${income_outcome}`;
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
    SELECT income_outcome, category, SUM(amount) as total_amount
    FROM account_transaction
    WHERE date LIKE ?
    GROUP BY income_outcome, category
`;

  db.all(query, [date + '%'], (err, rows) => {
    if (err) {
      console.error('account_transaction 테이블 조회 오류:', err.message);
      callback(err, null);
    }

    // 결과를 incomes와 outcomes로 나누어 분류
    // totalIncome, totalOutcome, profit 계산
    const report = { incomes: [], outcomes: [] };

    rows.forEach(row => {
      const type = row.income_outcome === 1 ? 'incomes' : 'outcomes';

      report[type].push({
        category: row.category,
        amount: row.total_amount,
      });
    });

    const totalIncome = report.incomes.reduce(
      (acc, income) => acc + income.amount,
      0,
    );

    const totalOutcome = report.outcomes.reduce(
      (acc, outcome) => acc + outcome.amount,
      0,
    );

    const profit = totalIncome - totalOutcome;

    callback(null, {
      totalIncome,
      totalOutcome,
      incomes: report.incomes,
      outcomes: report.outcomes,
      profit,
    });
  });
}

// 모듈 내보내기
module.exports = { getAccountTransaction, getTransactionReport };
