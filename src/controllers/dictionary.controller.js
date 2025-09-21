const dictionaryService = require('../service/dictionary.service.js');
const errorResponse = require('../utils/errorResponse.js');

class DictionaryController {
  async getAll(req, res) {
    try {
      const dictionaries = await dictionaryService.getAll();
      res.status(200).json(dictionaries);
    } catch (error) {
      console.error('Dictionary getAll error:', error);
      res.status(500).json({ message: "Lug'atlarni olishda xatolik" });
    }
  }

  async create(req, res) {
    try {
      const { name, description, type, imageUrl: bodyImageUrl } = req.body;
      const imageUrl = req.file?.location || bodyImageUrl || null;

      const newDictionary = await dictionaryService.create({
        name,
        description,
        type,
        createdBy: req.user?.id || null,
        imageUrl,
      });

      res.status(201).json(newDictionary);
    } catch (error) {
      errorResponse(res, error, "Lug'atni yaratishda xatolik");
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, type, imageUrl: bodyImageUrl } = req.body;
      const imageUrl = req.file?.location || bodyImageUrl || null;

      const updatedDictionary = await dictionaryService.update(id, {
        name,
        description,
        type,
        imageUrl,
      });

      if (!updatedDictionary) {
        return res.status(404).json({ message: "Lug'at topilmadi" });
      }

      res.status(200).json(updatedDictionary);
    } catch (error) {
      console.error('❌ Dictionary update error:', error);
      res.status(500).json({ message: "Lug'atni yangilashda xatolik" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await dictionaryService.delete(id);

      if (!deleted) {
        return res.status(404).json({ message: "Lug'at topilmadi" });
      }

      res.status(200).json({ message: "Lug'at muvaffaqiyatli o'chirildi" });
    } catch (error) {
      console.error(' Dictionary delete error:', error);
      res.status(500).json({ message: "Lug'atni o'chirishda xatolik" });
    }
  }
}

module.exports = DictionaryController;
