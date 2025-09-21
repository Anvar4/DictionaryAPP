const express = require('express');
const router = express.Router();
const wordController = require('../controllers/word.controller.js');
const { createWordValidator } = require('../validators/word.validator.js');
const checkDuplicate = require('../middleware/checkDuplicate.js');
const Word = require('../models/word.model.js');
router.post(
  '/',
  wordController.uploadMiddleware,
  createWordValidator,
  checkDuplicate(Word),
  wordController.createWord,
);

router.get('/', wordController.getWords);
router.get('/:id', wordController.getWordById);
router.put(
  '/:id',
  wordController.uploadMiddleware,
  createWordValidator,
  checkDuplicate(Word),
  wordController.updateWord,
);
router.delete('/:id', wordController.deleteWord);

module.exports = router;
