import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ transactions }) {
  // Group transactions by category
  const categoryData = transactions.reduce((acc, curr) => {
    if (!acc[curr.description]) {
      acc[curr.description] = 0;
    }
    acc[curr.description] += curr.amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryData);
  const data = {
    labels: labels,
    datasets: [
      {
        data: labels.map((label) => categoryData[label]),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF5733",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "'Arial', sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">Spending Breakdown</h3>
      <div className="chart">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default Chart;
