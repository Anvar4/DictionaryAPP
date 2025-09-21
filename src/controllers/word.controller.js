const Word = require('../models/word.model');
const Dictionary = require('../models/dictionary.model');
const Department = require('../models/department.model');
const Category = require('../models/category.model');
const { uploadFile, deleteFileS3 } = require('../utils/s3.js');
const multer = require('multer');
const errorResponse = require('../utils/errorResponse.js');

const upload = multer();
exports.uploadMiddleware = upload.single('image');

exports.createWord = async (req, res) => {
  try {
    const { name, meaning, dictionary, department, category, dictType, createdBy } = req.body;

    const dict = await Dictionary.findById(dictionary);
    if (!dict) return res.status(400).json({ error: 'Berilgan dictionary topilmadi' });

    if (!dictType || !['tarixiy', 'zamonaviy'].includes(dictType)) {
      return res.status(400).json({ error: 'Dictionary type noto‘g‘ri' });
    }
    if (dict.type !== dictType) {
      return res.status(400).json({ error: `Dictionary type '${dict.type}' bilan mos kelmadi` });
    }

    if (!(await Department.findById(department)))
      return res.status(400).json({ error: 'Berilgan department topilmadi' });

    if (!(await Category.findById(category)))
      return res.status(400).json({ error: 'Berilgan category topilmadi' });

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadFile(
        req.file.buffer,
        `words/${Date.now()}-${req.file.originalname}`,
        req.file.mimetype,
      );
    }

    const word = await Word.create({
      name,
      meaning,
      dictionary,
      department,
      category,
      imageUrl,
      createdBy: createdBy || null,
    });

    res.status(201).json(word);
  } catch (err) {
    errorResponse(res, err, 'So‘z yaratishda xatolik');
  }
};

exports.getWords = async (req, res) => {
  try {
    const words = await Word.find().populate('dictionary department category');
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id).populate('dictionary department category');
    if (!word) return res.status(404).json({ error: 'So‘z topilmadi' });
    res.json(word);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const { name, meaning, dictionary, department, category } = req.body;

    const word = await Word.findById(req.params.id);
    if (!word) return res.status(404).json({ error: 'So‘z topilmadi' });

    if (req.file && word.imageUrl) {
      await deleteFileS3(word.imageUrl.split('/').pop());
    }

    let imageUrl = word.imageUrl;
    if (req.file) {
      imageUrl = await uploadFile(
        req.file.buffer,
        `words/${Date.now()}-${req.file.originalname}`,
        req.file.mimetype,
      );
    }

    word.name = name || word.name;
    word.meaning = meaning || word.meaning;
    word.dictionary = dictionary || word.dictionary;
    word.department = department || word.department;
    word.category = category || word.category;
    word.imageUrl = imageUrl;

    await word.save();

    res.json(word);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteWord = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) return res.status(404).json({ error: 'So‘z topilmadi' });

    if (word.imageUrl) {
      await deleteFileS3(word.imageUrl.split('/').pop());
    }

    await word.deleteOne();

    res.json({ message: 'So‘z o‘chirildi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
