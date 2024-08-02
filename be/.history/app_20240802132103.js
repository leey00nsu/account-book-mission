const express = require('express');
const path = require('path');
const db = require('../be/db/database.js');
const app = express();
const PORT = 3000;
const cors = require('cors');

// 정적 파일 제공
app.use(express.static('public'));
app.use('/dist', express.static('dist'));
app.use(cors);

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

app.get('/accountTranscation', (req, res) => {
  db.getAccountTransaction((err, categories) => {
    if (err) {
      res.status(500).send('데이터베이스 오류');
    } else {
      res.json(categories);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
