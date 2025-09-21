const { body, param } = require('express-validator');

exports.createCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Kategoriya nomi majburiy')
    .isString()
    .withMessage('Kategoriya nomi matn bo‘lishi kerak'),

  body('dictionary')
    .notEmpty()
    .withMessage('Dictionary ID majburiy')
    .isMongoId()
    .withMessage('Dictionary ID noto‘g‘ri'),

  body('department')
    .notEmpty()
    .withMessage('Department ID majburiy')
    .isMongoId()
    .withMessage('Department ID noto‘g‘ri'),
];

exports.updateCategoryValidator = [
  param('id').isMongoId().withMessage('Kategoriya ID noto‘g‘ri'),

  body('name').optional().isString().withMessage('Kategoriya nomi matn bo‘lishi kerak'),

  body('dictionary').optional().isMongoId().withMessage('Dictionary ID noto‘g‘ri'),

  body('department').optional().isMongoId().withMessage('Department ID noto‘g‘ri'),
];

exports.deleteCategoryValidator = [param('id').isMongoId().withMessage('Kategoriya ID noto‘g‘ri')];
