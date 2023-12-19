const codes = {
    400: "Validation error",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
  };
  
  const isProduction = process.env.NODE_ENV === "production";
  
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const response = {
      title: codes[statusCode] ? codes[statusCode] : "Internal Server Error",
      message: err.message,
    };
  
    if (!isProduction) {
      response.stackTrace = err.stack;
    }
    res.status(statusCode).json(response);
  };
  
  module.exports = errorHandler;
  