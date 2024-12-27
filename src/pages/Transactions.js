import React, { useState, useEffect } from "react";
import "./../styles/transactions.css";

function Transactions({ updateDashboard, transactions }) {
  const [newTransaction, setNewTransaction] = useState({
    date: "", // This will be set to today's date by default
    description: "",
    amount: "",
  });

  // Set the default date to today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    setNewTransaction((prev) => ({
      ...prev,
      date: today, // Set today's date as default
    }));
  }, []);

  // Handle input changes for new transaction
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to add a new transaction
  const handleAddTransaction = (e, type) => {
    e.preventDefault();

    if (
      !newTransaction.date ||
      !newTransaction.description ||
      !newTransaction.amount
    ) {
      alert("Please fill all fields");
      return;
    }

    // Add or deduct the amount based on the button clicked
    const amount =
      type === "add"
        ? parseFloat(newTransaction.amount)
        : -parseFloat(newTransaction.amount);

    // Pass the new transaction to the updateDashboard function
    updateDashboard({
      ...newTransaction,
      amount,
    });

    // Reset the form fields
    setNewTransaction({ date: "", description: "", amount: "" });
  };

  return (
    <div className="transactions">
      <h2>Transaction History</h2>

      {/* Add Transaction Form */}
      <form className="add-transaction-form">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button
            type="submit"
            className="update-button add-button"
            onClick={(e) => handleAddTransaction(e, "add")}
          >
            Add Transaction
          </button>
          <button
            type="submit"
            className="update-button deduct-button"
            onClick={(e) => handleAddTransaction(e, "deduct")}
          >
            Deduct Transaction
          </button>
        </div>
      </form>

      {/* Transaction Log Table */}
      <h3>Transaction Log</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td className={transaction.amount < 0 ? "negative" : "positive"}>
                {transaction.amount < 0 ? "-" : "+"}₹
                {Math.abs(transaction.amount).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
