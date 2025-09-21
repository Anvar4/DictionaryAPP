const { body } = require('express-validator');

class AuthValidator {
  static signup = () => [
    body('phone', 'Telefon raqam kiritish majburiy!').notEmpty(),
    body('phone', "Telefon raqamni to'g'ri kiriting!").isString().matches(/^\d+$/),
    body('password', 'Parolni kiritish majburiy!').notEmpty(),
    body('password', "Parol kamida 4 raqamdan iborat bo'lishi kerak!")
      .isLength({ min: 4 })
      .isNumeric(),
  ];

  static login = () => [
    body('phone', 'Telefon raqam kiritish majburiy!').notEmpty(),
    body('phone', "Telefon raqamni to'g'ri kiriting!").isString().matches(/^\d+$/),
    body('password', 'Parolni kiritish majburiy!').notEmpty(),
    body('password', "Parol kamida 4 raqamdan iborat bo'lishi kerak!")
      .isLength({ min: 4 })
      .isNumeric(),
  ];
}

module.exports = { AuthValidator };
