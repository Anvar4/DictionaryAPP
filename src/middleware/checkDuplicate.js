// middlewares/checkDuplicate.js
module.exports = function checkDuplicate(model) {
  return async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'name kiritilishi shart' });
      }

      const existing = await model.findOne({ name });
      if (existing) {
        return res.status(400).json({ error: 'Bunday name allaqachon mavjud' });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
