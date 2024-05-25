import React, { useState } from "react";
import styles from "../../../styles/navbar.module.css"; // Import the CSS module
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../images/outfitLogo.png";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
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
            <div
              style={{
                width: "90px",
                height: "60px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  left: "50%",
                  top: "58%",
                  transform: "translate(-50%, -50%)",
                  maxHeight: "122%",
                }}
                onClick={() => {
                  navigate("/home");
                  handleItemClick("home");
                }}
              />
            </div>
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
                {" "}
                <Link to="/about">About</Link>
              </li>
              <li
                className={`${styles.item} ${
                  activeItem === "generator" ? styles.active : ""
                }`}
                onClick={() => handleItemClick("generator")}
              >
                <Link to="/generator">Generator</Link>
              </li>
              <li
                className={`${styles.item} ${
                  activeItem === "Myprofile" ? styles.active : ""
                }`}
                onClick={() => handleItemClick("Myprofile")}
              >
                <Link to="/Myprofile">My profile</Link>
              </li>
            </ul>
            <button
              className="btn btn-secondary h-25"
              onClick={() => {
                navigate("/login");
                localStorage.clear("token");
              }}
            >
              logout
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
