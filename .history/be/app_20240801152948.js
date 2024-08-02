// app.js
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db/database'); // 데이터베이스 모듈 임포트

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// GET /account_transaction 요청 처리
app.get('/account_transaction', (req, res) => {
  db.getAccountTransaction((err, hansaem) => {
    if (err) {
      res.status(500).send('데이터베이스 오류');
    } else {
      res.json(hansaem);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
