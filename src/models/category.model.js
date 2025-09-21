const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    dictionary: { type: Schema.Types.ObjectId, ref: 'Dictionary', required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    imageUrl: { type: String, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
);

module.exports = model('Category', categorySchema);
