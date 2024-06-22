const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL });

class ExchangeService {
  /**
   * Retrieves exchange rates from cache or external API.
   * @param {string} fromCurrency - The currency code to convert from.
   * @param {string} toCurrency - The currency code to convert to.
   * @returns {number} The exchange rate.
   * @throws {Error} If exchange rate retrieval fails.
   */
  static async getExchangeRates(fromCurrency, toCurrency) {
    const cacheKey = `${fromCurrency}-${toCurrency}`;

    // Check if exchange rates are cached
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    try {
      // Fetch exchange rates from external API
      const response = await axios.get(
        `${process.env.EXCHANGE_API_URL}/${fromCurrency}`,
        {
          headers: { "api-key": process.env.EXCHANGE_API_KEY },
          params: {
            symbols: toCurrency,
          },
        }
      );

      const exchangeRates = response.data.rates;

      // Validate if exchange rate exists for the 'toCurrency'
      if (!exchangeRates[toCurrency]) {
        throw new Error(`No exchange rate found for ${toCurrency}`);
      }

      // Cache exchange rates for future requests
      cache.set(cacheKey, exchangeRates[toCurrency]);
      const reverseCacheKey = `${toCurrency}-${fromCurrency}`;
      cache.set(reverseCacheKey, 1 / exchangeRates[toCurrency]);

      return exchangeRates[toCurrency];
    } catch (error) {
      // Handle API errors or caching failures
      throw new Error("Error fetching exchange rates.");
    }
  }
}

module.exports = ExchangeService;
