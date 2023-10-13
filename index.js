const express = require('express');
const receiptsRouter = require('./routes/receiptsRouter');

const app = express();
app.use(express.json());

app.use('/receipts', receiptsRouter);

app.get('/', (req, res) => {
  res.status(200).json('Hello World');
});
const server = app.listen(5500, () => {
  console.log('Server started on port 5500');
});

module.exports = { app, server };
