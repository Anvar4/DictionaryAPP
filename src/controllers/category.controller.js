const Category = require('../models/category.model.js');
const Dictionary = require('../models/dictionary.model.js');
const Department = require('../models/department.model.js');
const errorResponse = require('../utils/errorResponse.js');

// CREATE
exports.createCategory = async (req, res) => {
  try {
    const { name, dictionary, department, imageUrl, createdBy } = req.body;

    const dictExists = await Dictionary.findById(dictionary);
    if (!dictExists) return res.status(400).json({ error: 'Berilgan dictionary topilmadi' });

    const deptExists = await Department.findById(department);
    if (!deptExists) return res.status(400).json({ error: 'Berilgan department topilmadi' });

    const category = await Category.create({
      name,
      dictionary,
      department,
      imageUrl: imageUrl || null,
      createdBy: createdBy || null,
    });

    res.status(201).json(category);
  } catch (err) {
    errorResponse(res, err, 'Kategoriya yaratishda xatolik');
  }
};

// READ ALL
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ BY ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Topilmadi' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) return res.status(404).json({ message: 'Topilmadi' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Topilmadi' });
    res.json({ message: 'O‘chirildi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
