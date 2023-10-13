const express = require('express');
const app = express();

const receiptsController = require('../controllers/receiptsController');

const receiptsRouter = express.Router();

receiptsRouter.get('/:id/points', receiptsController.calcPoints, (req, res) => {
  res.status(200).json({ points: res.locals.points });
});
receiptsRouter.post('/process', receiptsController.generateId, (req, res) => {
  if (res.locals.receipt) {
    res
      .status(409)
      .json(
        'This receipt has already been processed. The id for it is ' +
          res.locals.id
      );
  } else {
    res.status(200).json({ id: res.locals.id });
  }
});

module.exports = receiptsRouter;
