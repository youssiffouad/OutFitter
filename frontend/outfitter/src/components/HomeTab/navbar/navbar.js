import React, { useState } from "react";
import styles from "../../../styles/navbar.module.css"; // Import the CSS module
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <button
            type="button"
            className={styles.togglebtn}
            onClick={() => handleItemClick("toggler")}
          >
            Toggle
          </button>
          <div id={styles.navbarNav}>
            <h2>My Logo</h2>
            <ul className={styles.nav}>
              <li
                className={`${styles.item} ${
                  activeItem === "home" ? styles.active : ""
                }`}
                onClick={() => handleItemClick("home")}
              >
                <Link to="/home">home</Link>
              </li>
              <li
                className={`${styles.item} ${
                  activeItem === "about" ? styles.active : ""
                }`}
                onClick={() => handleItemClick("about")}
              >
                <Link to="/about">About</Link>
              </li>
              <li
                className={`${styles.item} ${
                  activeItem === "services" ? styles.active : ""
                }`}
                onClick={() => handleItemClick("services")}
              >
                <Link to="/services">Services</Link>
              </li>
              <li
                className={`${styles.item} ${
                  activeItem === "contact" ? styles.active : ""
                }`}
                onClick={() => handleItemClick("contact")}
              >
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
