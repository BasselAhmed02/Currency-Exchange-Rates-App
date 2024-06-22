import React from "react";

const ExchangeRateDisplay = ({ rate }) => {
  return (
    <div className="mt-4">
      {rate !== null ? (
        <p className="text-xl font-bold">Exchange Rate: {rate}</p>
      ) : (
        <p className="text-xl text-red-600">No rate available</p>
      )}
    </div>
  );
};

export default ExchangeRateDisplay;
