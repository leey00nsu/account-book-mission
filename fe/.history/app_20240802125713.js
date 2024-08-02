const express = require('express');
const path = require('path');
const db = require('../be/db/database.js');
const app = express();
const PORT = 3001;

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

app.get('/account_transaction', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account_book.html'));
});

// 데이터 API 엔드포인트 추가
app.get('/api/account_transaction', (req, res) => {
  const transactions = [
    {
      date: '2024-01-01',
      category: '식비',
      description: '점심',
      amount: 10000,
    },
    {
      date: '2024-01-02',
      category: '교통비',
      description: '버스',
      amount: 2000,
    },
    // 실제 데이터로 교체
  ];
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
