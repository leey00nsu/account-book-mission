const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 연결 (없으면 생성됨)
const db = new sqlite3.Database('mydatabase.db', err => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err.message);
  } else {
    console.log('데이터베이스 연결 성공');
  }
});

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

// account_transaction 테이블 생성
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
      console.error('account_transaction 테이블 생성 오류:', err.message);
    } else {
      console.log('account_transaction 테이블 생성 성공');
    }
  },
);

// category 데이터 삽입
db.run(`INSERT INTO category (title) VALUES ('기타')`, function (err) {
  if (err) {
    console.error('category 데이터 삽입 오류:', err.message);
  } else {
    console.log('category 데이터 삽입 성공');

    // 삽입된 category의 idx를 가져옵니다.
    const categoryIdx = this.lastID;

    // account_transaction 데이터 삽입
    db.run(
      `
        INSERT INTO account_transaction (income_outcome, amount, description, date, category_idx)
        VALUES (1, 1000, '예시 거래', '2024-08-02', ?)
      `,
      [categoryIdx],
      err => {
        if (err) {
          console.error('account_transaction 데이터 삽입 오류:', err.message);
        } else {
          console.log('account_transaction 데이터 삽입 성공');
        }
        // 데이터베이스 연결 종료 코드 제거
      },
    );
  }
});
// 모든 account_transaction 조회 함수
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

function getCategories(callback) {
  db.all('SELECT * FROM category;', [], (err, rows) => {
    if (err) {
      console.error('category 테이블 조회 오류:', err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

// 모듈 내보내기
module.exports = { getAccountTransaction, getCategories };
