const handleError = require('../../utils/errorHandler.js');
const User = require('../../models/auth/auth.models.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/jwt.js');

class AuthController {
  async register(req, res) {
    try {
      const { phone, password } = req.body;

      if (!password || password.length < 4) {
        return res
          .status(400)
          .json({ message: 'Parol kamida 4 ta belgidan iborat bo‘lishi kerak' });
      }

      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res.status(400).json({ message: 'Bu telefon raqami avval ro‘yxatdan o‘tgan' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        phone,
        password: hashedPassword,
      });

      const token = generateToken(newUser);

      res.status(201).json({
        message: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi',
        user: { id: newUser._id, phone: newUser.phone },
        token,
      });
    } catch (error) {
      handleError(res, error, 'Ro‘yxatdan o‘tishda xatolik');
    }
  }
  async login(req, res) {
    try {
      const { phone, password } = req.body;

      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(400).json({ message: 'Telefon raqami yoki parol noto‘g‘ri' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Telefon raqami yoki parol noto‘g‘ri' });
      }

      const token = generateToken(user);

      res.status(200).json({
        message: 'Foydalanuvchi muvaffaqiyatli tizimga kirdi',
        user: { id: user._id, phone: user.phone },
        token,
      });
    } catch (error) {
      handleError(res, error, 'Tizimga kirishda xatolik');
    }
  }
  async me(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
      }

      res.status(200).json({ user });
    } catch (error) {
      handleError(res, error, "Foydalanuvchi ma'lumotlarini olishda xatolik");
    }
  }
}

module.exports = new AuthController();
