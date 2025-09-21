const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware.js');
const departmentController = require('../controllers/department.controller');
const { validate } = require('../middleware/validate.js');
const {
  createDepartmentValidator,
  updateDepartmentValidator,
  deleteDepartmentValidator,
} = require('../validators/department.validator');
const checkDuplicate = require('../middleware/checkDuplicate.js');
const Department = require('../models/department.model.js');

router.post(
  '/',
  upload.single('image'),
  createDepartmentValidator,
  checkDuplicate(Department),
  validate,
  departmentController.createDepartment,
);

router.get('/', departmentController.getDepartments);

router.put(
  '/:id',
  upload.single('image'),
  updateDepartmentValidator,
  validate,
  departmentController.updateDepartment,
);

router.delete('/:id', deleteDepartmentValidator, validate, departmentController.deleteDepartment);

module.exports = router;
