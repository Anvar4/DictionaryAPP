const Dictionary = require('../models/dictionary.model.js');

class DictionaryService {
  async getAll() {
    return await Dictionary.find();
  }

  async create(data) {
    const dictionary = new Dictionary(data);
    return await dictionary.save();
  }

  async update(id, data) {
    return await Dictionary.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Dictionary.findByIdAndDelete(id);
  }
}

module.exports = new DictionaryService();
