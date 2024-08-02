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

// 데이터 API 엔드포인트
app.get('/account_transaction', async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.getAccountTransaction((err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log(rows + ' ?');
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
