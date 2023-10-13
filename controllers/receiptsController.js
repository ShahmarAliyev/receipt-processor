const { addPoints, generateID } = require('./helpers');
const receipts = require('../models/receipt');
const receiptsController = {};

receiptsController.calcPoints = (req, res, next) => {
  const { id } = req.params;
  const receipt = receipts[id];
  res.locals.points = addPoints(receipt);
  return next();
};
receiptsController.generateId = (req, res, next) => {
  res.locals.id = generateID(req.body);
  if (receipts[res.locals.id]) {
    res.locals.receipt = true;
    return next();
  }
  receipts[res.locals.id] = req.body;
  return next();
};

module.exports = receiptsController;
