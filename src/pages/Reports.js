import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import "./../styles/reports.css";

// Register necessary components for different chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function Reports({ transactions }) {
  // Filter out the expense transactions
  const expenseTransactions = transactions.filter((t) => t.amount < 0);

  // Data Processing for Category Breakdown
  const categoryData = expenseTransactions.reduce((acc, curr) => {
    if (!acc[curr.description]) {
      acc[curr.description] = 0;
    }
    acc[curr.description] += Math.abs(curr.amount); // Store absolute value for expense amounts
    return acc;
  }, {});

  const labels = Object.keys(categoryData);

  // Grouping transactions by week (using ISO week number)
  const getWeekNumber = (date) => {
    const currentDate = new Date(date);
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7);
  };

  const groupedByWeek = expenseTransactions.reduce((acc, curr) => {
    const week = `Week ${getWeekNumber(curr.date)} of ${new Date(
      curr.date
    ).getFullYear()}`;
    if (!acc[week]) acc[week] = 0;
    acc[week] += Math.abs(curr.amount); // Store absolute value for expense amounts
    return acc;
  }, {});

  const weeks = Object.keys(groupedByWeek);
  const weeklyExpenses = weeks.map((week) => groupedByWeek[week]);

  // Chart Data for Weekly Expenses
  const lineData = {
    labels: weeks,
    datasets: [
      {
        label: "Weekly Expenses",
        data: weeklyExpenses,
        fill: false,
        borderColor: "#FF5733",
        tension: 0.1,
      },
    ],
  };

  // Chart Data for Expense Distribution by Category
  const doughnutData = {
    labels: labels,
    datasets: [
      {
        data: labels.map((label) => categoryData[label]),
        backgroundColor: ["#36A2EB", "#FF5733", "#4CAF50", "#FF6384"],
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="reports">
      <h2>Expense Reports</h2>

      {/* Weekly Expenses Line Chart */}
      <div className="chart-container">
        <h3 className="chart-title">Weekly Expense Trend</h3>
        <Line data={lineData} options={chartOptions} />
      </div>

      {/* Expense Distribution by Category Doughnut Chart */}
      <div className="chart-container">
        <h3 className="chart-title">Expense Distribution by Category</h3>
        <Doughnut data={doughnutData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Reports;
