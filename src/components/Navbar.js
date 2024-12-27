import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

  // Toggle menu open/close state
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu when the location (page) changes
  useEffect(() => {
    setMenuOpen(false); // Close the menu when page changes
  }, [location]);

  return (
    <nav className="navbar">
      <h1>Personal Finance Dashboard</h1>
      <div className="hamburger" onClick={handleMenuToggle}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>
      <ul
        className={`${menuOpen ? "active" : ""} ${
          menuOpen === false ? "closing" : ""
        }`}
      >
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
