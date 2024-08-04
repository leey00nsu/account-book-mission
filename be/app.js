const express = require('express');
const db = require('../be/db/database.js');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());

// account_transaction 조회 쿼리
app.get('/account-transaction', async (req, res) => {
  const { type, date } = req.query; // 쿼리 파라미터에서 type과 date를 추출
  try {
    const rows = await new Promise((resolve, reject) => {
      db.getAccountTransaction(type, date, (err, rows) => {
        // type과 date를 getAccountTransaction 함수에 전달
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // 조회 결과를 클라이언트에 응답
    // 수입/지출을 문자열로 변환
    const transformedRows = rows.map(row => {
      return {
        date: row.date,
        category: row.category,
        description: row.description,
        amount: row.amount,
        type: row.income_expense === 1 ? '수입' : '지출',
      };
    });

    res.json(transformedRows);
  } catch (err) {
    console.error('Error fetching account transactions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 손익 계산서 조회 쿼리
app.get('/report', async (req, res) => {
  const { date } = req.query; // 쿼리 파라미터에서 type과 date를 추출
  try {
    const rows = await new Promise((resolve, reject) => {
      db.getTransactionReport(date, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.json(rows);
  } catch (err) {
    console.error('Error fetching account transactions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// account_transaction 삽입 쿼리
app.post('/account-transaction', (req, res) => {
  const transaction = req.body;
  transaction.type = transaction.type === 'income' ? 1 : 0;
  db.insertTransaction(transaction, (err, lastID) => {
    if (err) {
      return res
        .status(500)
        .json({ error: '데이터 삽입 오류: ' + err.message });
    }
    return res.status(201).json({ success: true, lastID });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
