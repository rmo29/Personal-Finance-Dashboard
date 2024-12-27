import React from "react";
import Card from "../components/Card";
import Chart from "../components/Chart";
import "./../styles/dashboard.css";

function Dashboard({ transactions }) {
  // Calculate total income, expenses, and savings
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const savings = income + expenses;

  return (
    <div className="dashboard">
      <h2>Overview</h2>
      <div className="cards">
        <Card title="Income" value={`₹${income.toLocaleString()}`} />
        <Card
          title="Expenses"
          value={`₹${Math.abs(expenses).toLocaleString()}`}
        />
        <Card
          title="Savings"
          value={`₹${Math.abs(savings).toLocaleString()}`}
        />
      </div>
      <Chart transactions={transactions} />
    </div>
  );
}

export default Dashboard;
