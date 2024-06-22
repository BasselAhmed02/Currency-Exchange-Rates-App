// Error handling middleware function
function errorHandler(err, req, res, next) {
  // Log the error stack trace to the console
  console.error(err.stack);

  // Respond with a 500 status code and the error message in JSON format
  res.status(500).json({ error: err.message });
}

module.exports = errorHandler;
