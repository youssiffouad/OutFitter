// About.js

import React, { useState } from "react";
import aboutimgs from "./Aboutimages";
import styles from "../../styles/about.module.css"; // Import the styles

const AboutHeader = () => {
  return (
    <div className={` container-fluid p-0`}>
      <div className={`${styles.imgContainer}`}>
        <img src={aboutimgs[0]} className={` img-fluid`} alt="About" />
        <div className={styles.textOverlay}>
          <h2>Your magical AI wizard</h2>

          <p>
            Get Your Tailored Outfit Suiting Your Mode, Weather Conditions And
            Occasion
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
