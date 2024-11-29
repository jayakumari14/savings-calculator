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
      // Ensure `componentRef` is properly typed as HTMLDivElement
      const chartContainer = componentRef.current as HTMLDivElement;

      const chartCanvas = chartContainer.querySelector("canvas");
      if (chartCanvas) {
        const context = chartCanvas.getContext("2d");
        if (context) {
          // Save the original state
          context.save();

          // Set white background
          context.globalCompositeOperation = "destination-over"; // Ensures background is drawn first
          context.fillStyle = "white";
          context.fillRect(0, 0, chartCanvas.width, chartCanvas.height);

          // Restore the original state
          context.restore();
        }
      }

      // Render HTML to PDF
      doc.html(chartContainer, {
        callback: function (doc) {
          doc.save("SavingsInterest.pdf");
        },
        margin: [20, 20, 20, 20],
        x: 10,
        y: 10,
        width: 180,
        windowWidth: 1000,
      });
    } else {
      console.error("Component reference is null.");
    }
  };

  const data = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [principal, result || 0],
        backgroundColor: ["#3B82F6", "#69AFFF"],
        hoverBackgroundColor: ["#2563EB", "#3B82F6"], // Optional for hover effect
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "50%", // Transforms the pie chart into a donut chart
  };

  return (
    <div ref={componentRef} className={styles.calculatorContainer}>
      <h2 className={styles.heading}>Simple Interest Calculator</h2>

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
            Download as PDF
          </button>
        </div>
      )}

      {result !== null && (
        <div className={styles.chartContainer}>
          <h3>Interest Breakdown</h3>
          <Pie data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default SavingsInterest;
