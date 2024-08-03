const express = require('express');
const path = require('path');
const db = require('../be/db/database.js');
const app = express();
const PORT = 3000;
const cors = require('cors');

// 정적 파일 제공
app.use(express.static('public'));
app.use('/dist', express.static('dist'));
app.use(cors());

// 라우트 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/pageA', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageA.html'));
});

app.get('/pageB', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageB.html'));
});

// account_transaction 조회 쿼리
app.get('/account_transaction', async (req, res) => {
  const { income_outcome, date } = req.query; // 쿼리 파라미터에서 type과 date를 추출
  try {
    const rows = await new Promise((resolve, reject) => {
      db.getAccountTransaction(income_outcome, date, (err, rows) => {
        // type과 date를 getAccountTransaction 함수에 전달
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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
