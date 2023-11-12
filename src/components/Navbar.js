import React from "react";
const navElements = [
  "Home",
  "About",
  "Menu",
  "Reservations",
  "Order online",
  "Login",
];

function Navbar() {
  return (
    <nav>
      <ul>
        {navElements.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
