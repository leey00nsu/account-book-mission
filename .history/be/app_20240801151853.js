const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET /transactions 요청 처리
app.get('/transactions', (req, res) => {
  db.getTransactions((err, transactions) => {
    if (err) {
      res.status(500).send('데이터베이스 오류');
    } else {
      res.json(transactions);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
