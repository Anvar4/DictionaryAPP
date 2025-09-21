class HttpException extends Error {
  constructor(statusCode, msg) {
    super(msg);
    this.statusCode = statusCode;
    this.msg = msg;
    this.message = msg;
  }
}

module.exports = { HttpException };
