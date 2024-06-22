const ExchangeService = require("../services/exchangeService"); // Import the ExchangeService module
const axios = require("axios"); // Import axios for mocking
jest.mock("axios"); // Mock axios for testing purposes

describe("ExchangeService", () => {
  it("should throw an error when the API call fails", async () => {
    // Mock axios.get to simulate a rejected promise (API call failure)
    axios.get.mockRejectedValue(new Error("API error"));

    // Use expect().rejects.toThrow() to verify that ExchangeService throws an error
    await expect(ExchangeService.getExchangeRates("EUR")).rejects.toThrow(
      "Error fetching exchange rates." // Expected error message when API call fails
    );
  });
});
