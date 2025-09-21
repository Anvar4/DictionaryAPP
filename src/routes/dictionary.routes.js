const express = require('express');
const DictionaryController = require('../controllers/dictionary.controller.js');
const {
  createDictionaryValidator,
  updateDictionaryValidator,
} = require('../validators/dictionary.validator.js');
const { expressValidate } = require('../validators/index.js');
const checkDuplicate = require('../middleware/checkDuplicate.js');
const Dictionary = require('../models/dictionary.model.js');
const dictionaryRouter = express.Router();
const dictionaryController = new DictionaryController();

dictionaryRouter.get('/', (req, res) => dictionaryController.getAll(req, res));

dictionaryRouter.post(
  '/',
  createDictionaryValidator,
  expressValidate,
  checkDuplicate(Dictionary),
  (req, res) => dictionaryController.create(req, res),
);

dictionaryRouter.put('/:id', updateDictionaryValidator, expressValidate, (req, res) =>
  dictionaryController.update(req, res),
);

dictionaryRouter.delete('/:id', (req, res) => dictionaryController.delete(req, res));

module.exports = dictionaryRouter;
