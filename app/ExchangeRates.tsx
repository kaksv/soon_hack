"use client";

import React, { useEffect, useState } from "react";

const ExchangeRates = ({
  currency,
  token,
  amount,
}: {
  currency: string;
  token: string;
  amount: number;
}) => {
  const [recieveAmount, setRecieveAmount] = useState(0);

  useEffect(() => {
    const calculate = async () => {
      const result = await fetch("https://open.er-api.com/v6/latest/USD");

      const exchanges = await result.json();

      const rate = exchanges.rates[currency];

      setRecieveAmount(amount * rate *0.13);
    };

    calculate();
  }, [amount, currency]);

  return (
    <h2 className="text-center my-6 text-xs md:text-sm">
      {amount} {token} ={" "}
      <span className="font-bold">
        {currency} {recieveAmount.toFixed(2)}
      </span>{" "}
    </h2>
  );
};

export default ExchangeRates;
