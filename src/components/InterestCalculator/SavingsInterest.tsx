"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Pie } from "react-chartjs-2";
import { jsPDF } from "jspdf";

// Chart.js components
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const SavingsInterest = () => {
  const [isClient, setIsClient] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [principal, setPrincipal] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [time, setTime] = useState<number | "">("");
  const [result, setResult] = useState<number | null>(null);

  if (!isClient) return null;

  const calculateSavings = () => {
    if (principal && rate && time) {
      const interest = (principal * rate * time) / 100;
      setResult(interest);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    if (componentRef.current) {
      doc.html(componentRef.current, {
        callback: function (doc) {
          // Ensure that the content doesn't break the page.
          const pageHeight = doc.internal.pageSize.height;
          let currentHeight = 0;

          doc.setFontSize(12);
          doc.text("Savings Interest Calculator", 20, (currentHeight += 10));
          // Ensure pie chart does not overflow into text.
          currentHeight += 40;
          if (currentHeight > pageHeight) {
            doc.addPage(); // Add a new page if it overflows.
            currentHeight = 20;
          }

          doc.save("SavingsInterest.pdf");
        },

        margin: [20, 20, 20, 20], // Adjust the margins to give enough space
        x: 10,
        y: 10,
        width: 180, // Set width to prevent overflow
        windowWidth: 1000, // This might need tuning for large components
      });
    }
  };

  const data = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [principal, result || 0],
        backgroundColor: ["#3B82F6", "#69AFFF"],
      },
    ],
  };

  return (
    <div ref={componentRef} className={styles.calculatorContainer}>
      <h2 className={styles.heading}>Savings Interest Calculator</h2>

      <div className={styles.inputSection}>
        <label className={styles.label}>Principal Amount:</label>
        <input
          type="number"
          className={styles.input}
          placeholder="Enter Principal"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
        />
      </div>

      <div className={styles.inputSection}>
        <label className={styles.label}>Annual Interest Rate (%):</label>
        <input
          type="number"
          className={styles.input}
          placeholder="Enter Rate"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </div>

      <div className={styles.inputSection}>
        <label className={styles.label}>Time (Years):</label>
        <input
          type="number"
          className={styles.input}
          placeholder="Enter Time"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </div>

      <button className={styles.calculateButton} onClick={calculateSavings}>
        Calculate
      </button>

      {result !== null && (
        <div className={styles.resultBox}>
          <h3>Total Interest: ₹{result}</h3>
          <button className={styles.downloadButton} onClick={downloadPDF}>
            Download UI as PDF
          </button>
        </div>
      )}

      {result !== null && (
        <div className={styles.chartContainer}>
          <h3>Interest Breakdown</h3>
          <Pie
            data={data}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>
      )}
    </div>
  );
};

export default SavingsInterest;
