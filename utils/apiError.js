//@ dec this calss is resbonsanle about error that i can  predict


class ApiError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
    }
  }
  
  module.exports = ApiError;