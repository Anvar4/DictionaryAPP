const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\+998[0-9]{9}$/, 'Telefon raqami noto‘g‘ri formatda'],
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
