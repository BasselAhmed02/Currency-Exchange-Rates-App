const ExchangeService = require("../services/exchangeService");

class ExchangeController {
  // Method to handle GET request for exchange rates
  static async getRates(req, res, next) {
    // Extract 'from' and 'to' query parameters from the request
    const { from, to } = req.query;

    // Validate the query parameters
    if (!from || !to) {
      // If parameters are missing, respond with a 400 status code and error message
      return res
        .status(400)
        .json({ error: "Missing required query parameters: from, to" });
    }

    try {
      // Call the service method to get exchange rates
      const rate = await ExchangeService.getExchangeRates(from, to);

      // Respond with the rate in JSON format
      res.json({ rate });
    } catch (error) {
      // If there's an error, pass it to the next middleware (error handler)
      next(error);
    }
  }
}

module.exports = ExchangeController;
