const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 연결 (없으면 생성됨)
const db = new sqlite3.Database('mydatabase.db', err => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err.message);
  } else {
    console.log('데이터베이스 연결 성공');
  }
});

// hansaem 테이블 생성
db.run(
  `CREATE TABLE IF NOT EXISTS account_transaction (
    idx INTEGER PRIMARY KEY AUTOINCREMENT,
    income_outcome INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    description TEXT,
    date TEXT,
    category_idx INTEGER,
    FOREIGN KEY (category_idx) REFERENCES category(idx)
)`,
  err => {
    if (err) {
      console.error('hansaem 테이블 생성 오류:', err.message);
    } else {
      console.log('hansaem 테이블 생성 성공');
    }
  },
);

// category 테이블 생성
db.run(
  `CREATE TABLE IF NOT EXISTS category (
    idx INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
)`,
  err => {
    if (err) {
      console.error('category 테이블 생성 오류:', err.message);
    } else {
      console.log('category 테이블 생성 성공');
    }
  },
);

// 모든 transaction 조회 함수
function getAccountTransaction(callback) {
  db.all('SELECT * FROM account_transaction;', [], (err, rows) => {
    if (err) {
      console.error('account_transaction 테이블 조회 오류:', err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

// 데이터베이스 연결 종료
db.close(err => {
  if (err) {
    console.error('데이터베이스 종료 오류:', err.message);
  } else {
    console.log('데이터베이스 종료 성공');
  }
});
