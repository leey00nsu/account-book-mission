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

// 모듈 내보내기
module.exports = { getAccountTransaction };
