const mongoose = require('mongoose');

const dictionarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ['tarixiy', 'zamonaviy'],
      required: true,
    },
    description: { type: String },
    imageUrl: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Dictionary', dictionarySchema);
