import React, { useState } from "react";
import CurrencyForm from "./components/CurrencyForm";
import ExchangeRateDisplay from "./components/ExchangeRateDisplay";
import axios from "axios";

const App = () => {
  const [rate, setRate] = useState(null);

  const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/exchange-rate?from=${fromCurrency}&to=${toCurrency}`
      );
      setRate(response.data.rate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setRate(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Currency Exchange
        </h2>
        <CurrencyForm onGetRate={getExchangeRate} />
        <ExchangeRateDisplay rate={rate} />
      </div>
    </div>
  );
};

export default App;
