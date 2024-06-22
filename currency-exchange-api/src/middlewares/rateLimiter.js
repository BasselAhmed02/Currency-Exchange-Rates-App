const rateLimit = require("express-rate-limit");

// Creates a rate limiter middleware with the following configurations:
const limiter = rateLimit({
  windowMs: 60000, // Time window for which requests are counted (in milliseconds)
  max: 15, // Maximum number of requests allowed within the windowMs time window
  message: { error: "Too many requests, please try again later." }, // Error message returned when limit is exceeded
  headers: true, // Includes relevant headers in the response for rate limiting information
});

module.exports = limiter;
