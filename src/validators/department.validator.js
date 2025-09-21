const { body, param } = require('express-validator');

exports.createDepartmentValidator = [
  body('name')
    .notEmpty()
    .withMessage('Bo‘lim nomi kiritilishi shart')
    .isLength({ min: 2 })
    .withMessage('Bo‘lim nomi eng kamida 2 ta belgidan iborat bo‘lishi kerak'),

  body('dictionaryId')
    .notEmpty()
    .withMessage('Tegishli lug‘at ID majburiy')
    .isMongoId()
    .withMessage('dictionaryId noto‘g‘ri formatda'),
];

exports.updateDepartmentValidator = [
  param('id').isMongoId().withMessage('Bo‘lim ID noto‘g‘ri'),

  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Bo‘lim nomi eng kamida 2 ta belgidan iborat bo‘lishi kerak'),

  body('dictionaryId').optional().isMongoId().withMessage('dictionaryId noto‘g‘ri formatda'),
];

exports.deleteDepartmentValidator = [param('id').isMongoId().withMessage('Bo‘lim ID noto‘g‘ri')];
