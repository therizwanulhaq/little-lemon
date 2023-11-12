import React from "react";
import logo from "../assets/Logo .svg";
import Navbar from "./Navbar";

function Header() {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <Navbar />
    </header>
  );
}

export default Header;
