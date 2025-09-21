const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  dictionary: { type: mongoose.Schema.Types.ObjectId, ref: "Dictionary", required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  imageUrl: { type: String, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

wordSchema.index(
  { name: 1, dictionary: 1, department: 1, category: 1 },
  { unique: true }
);

module.exports = mongoose.model("Word", wordSchema);
