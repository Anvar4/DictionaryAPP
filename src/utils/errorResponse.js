function errorResponse(res, error, customMessage = 'Xatolik yuz berdi') {
  console.error('Error:', error);

  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: customMessage,
      errors: messages,
    });
  }

  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: customMessage,
      error: 'Bu qiymat allaqachon mavjud',
      field: Object.keys(error.keyValue),
    });
  }

  return res.status(500).json({
    success: false,
    message: customMessage,
    error: error.message || error,
  });
}

module.exports = errorResponse;
