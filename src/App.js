import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Function to update the transactions when a new transaction is added
  const updateDashboard = (newTransaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Pass transactions to the Dashboard */}
          <Route path="/" element={<Dashboard transactions={transactions} />} />

          {/* Pass updateDashboard and transactions to Transactions */}
          <Route
            path="/transactions"
            element={
              <Transactions
                updateDashboard={updateDashboard}
                transactions={transactions}
              />
            }
          />

          {/* Pass transactions to Reports */}
          <Route
            path="/reports"
            element={<Reports transactions={transactions} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
