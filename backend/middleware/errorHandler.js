// Global error handler — catches all errors from controllers
// MUST be last app.use() in server.js
// Express recognizes it as error handler because it has 4 parameters
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Mongoose Validation Error (missing required, bad enum, etc)
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: messages
    });
  }

  // Mongoose CastError (malformed ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Invalid ${err.path}: ${err.value}`
    });
  }

  // Duplicate key error (e.g., unique constraint)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate field value entered'
    });
  }

  // Fallback: generic 500 error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Something went wrong'
  });
}

module.exports = errorHandler;