const { body, validationResult } = require('express-validator');

exports.createWordValidator = [
  body('name').notEmpty().withMessage('So‘z nomi kerak'),
  body('meaning').notEmpty().withMessage('Tavsif kerak'),
  body('dictionary').isMongoId().withMessage('Dictionary ID noto‘g‘ri'),
  body('department').isMongoId().withMessage('Department ID noto‘g‘ri'),
  body('category').isMongoId().withMessage('Category ID noto‘g‘ri'),
  body('dictType')
    .notEmpty()
    .withMessage('DictType kerak')
    .isIn(['zamonaviy', 'qadimiy', 'tarixiy'])
    .withMessage('DictType faqat zamonaviy, qadimiy yoki tarixiy bo‘lishi mumkin'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
