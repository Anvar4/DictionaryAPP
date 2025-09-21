const { body, param } = require('express-validator');

exports.createDictionaryValidator = [
  body('name').notEmpty().withMessage('Lug‘at nomi kiritilishi shart'),
  body('type')
    .notEmpty()
    .withMessage('Lug‘at turi tanlanishi shart')
    .isIn(['tarixiy', 'zamonaviy'])
    .withMessage("Lug‘at turi faqat 'tarixiy' yoki 'zamonaviy' bo‘lishi mumkin"),
];

exports.updateDictionaryValidator = [
  param('id').isMongoId().withMessage('Lug‘at ID noto‘g‘ri'),
  body('name').optional().notEmpty().withMessage('Lug‘at nomi bo‘sh bo‘lishi mumkin emas'),
  body('type')
    .optional()
    .isIn(['tarixiy', 'zamonaviy'])
    .withMessage("Lug‘at turi faqat 'tarixiy' yoki 'zamonaviy' bo‘lishi mumkin"),
];
