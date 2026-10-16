const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  res.status(statusCode).json({
    message: err.message,
    details: err.details,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
module.exports = { errorHandler };
