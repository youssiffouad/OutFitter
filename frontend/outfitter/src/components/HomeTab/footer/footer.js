import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../../../styles/footerStyle.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-2">
            <h6>Contact Us</h6>
            <p className="fontstylefooter">Email: info@example.com</p>
            <p className="fontstylefooter">Phone: +123 456 7890</p>
          </div>
          <div className="col-md-4 mb-2">
            <h6>Information</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#"
                  className="text-white text-decoration-none fontstylefooter "
                  style={{ cursor: "pointer", fontSize: "1rem" }}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-decoration-none fontstylefooter"
                  style={{ cursor: "pointer", fontSize: "1rem" }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white text-decoration-none fontstylefooter"
                  style={{ cursor: "pointer", fontSize: "1rem" }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-2">
            <h6>About Us</h6>
            <p className="fontstylefooter">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              tincidunt eros in dolor fermentum, eu vehicula risus fringilla.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
