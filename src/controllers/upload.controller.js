exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Fayl topilmadi' });
  }
  res.status(200).json({
    success: true,
    url: req.file.location,
  });
};
