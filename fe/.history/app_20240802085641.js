const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// 정적 파일 제공
app.use(express.static('public'));
app.use('/dist', express.static('dist'));

// 라우트 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account_book.html'));
});

app.get('/pageA', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageA.html'));
});

app.get('/pageB', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pageB.html'));
});

app.get('/category', (req, res) => {
  // 실제 데이터베이스 또는 데이터 로직을 여기에 추가
  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
  ];
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
