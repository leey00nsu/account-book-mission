const express = require('express');
const path = require('path');

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

app.get('/report', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'report.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
