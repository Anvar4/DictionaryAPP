const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const checkDuplicate = require('../middleware/checkDuplicate.js');
const categoryValidator = require('../validators/category.validator.js');
const Category = require('../models/category.model.js');

router.post(
  '/',
  checkDuplicate(Category),
  categoryValidator.createCategoryValidator,
  categoryController.createCategory,
);

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.put('/:id', categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
