function errorMiddleware(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.msg || 'Server error';
  console.error('Error:', err.message);
  res.status(status).json({ success: false, message });
}

module.exports = errorMiddleware;
