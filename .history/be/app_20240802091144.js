const express = require('express');
const path = require('path');
const cors = require('cors');
const { getAccountTransaction, getCategories } = require('./db'); // db.js에서 함수 가져오기

const app = express();
const PORT = 3000;

// CORS 미들웨어 설정
app.use(cors());

// 정적 파일 제공
app.use(express.static('public'));
app.use('/dist', express.static('dist'));

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

// 카테고리 데이터 제공
app.get('/category', (req, res) => {
  getCategories((err, categories) => {
    if (err) {
      res.status(500).send('데이터베이스 오류');
    } else {
      res.json(categories);
    }
  });
});

// 모든 account_transaction 조회
app.get('/account_transactions', (req, res) => {
  getAccountTransaction((err, transactions) => {
    if (err) {
      res.status(500).send('데이터베이스 오류');
    } else {
      res.json(transactions);
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 서버 종료 시 데이터베이스 연결 종료
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  db.close(err => {
    if (err) {
      console.error('데이터베이스 종료 오류:', err.message);
    } else {
      console.log('데이터베이스 종료 성공');
    }
    process.exit(0);
  });
});
