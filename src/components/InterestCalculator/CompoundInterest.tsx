"use client";

import { useState } from "react";
import styles from "./styles.module.css";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [time, setTime] = useState<number | "">("");
  const [frequency, setFrequency] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);

  const calculateCompoundInterest = () => {
    if (principal && rate && time) {
      const compoundInterest =
        principal * Math.pow(1 + rate / (100 * frequency), frequency * time);
      setResult(compoundInterest - principal);
    }
  };

  return (
    <div className={styles.calculatorContainer}>
      <h2>Compound Interest Calculator</h2>
      <input
        type="number"
        placeholder="Principal Amount"
        value={principal}
        onChange={(e) => setPrincipal(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Annual Interest Rate (%)"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Time (Years)"
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(Number(e.target.value))}
      >
        <option value={1}>Yearly</option>
        <option value={2}>Half-Yearly</option>
        <option value={4}>Quarterly</option>
        <option value={12}>Monthly</option>
      </select>
      <button onClick={calculateCompoundInterest}>Calculate</button>
      {result !== null && <p>Total Compound Interest: ₹{result.toFixed(2)}</p>}
    </div>
  );
};

export default CompoundInterest;
