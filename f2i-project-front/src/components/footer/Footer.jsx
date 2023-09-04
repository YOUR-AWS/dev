import React from "react";
import twitter from "../../assets/twitter.png";
import facebook from "../../assets/facebook.png";
import linkedin from "../../assets/linkedin.png";
import pinterest from "../../assets/pinterest.png";
import instagram from "../../assets/instagram.png";
import language from "../../assets/language.png";
import coin from "../../assets/coin.png";
import accessbility from "../../assets/accessibility.png";

import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="link">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
          </div>

          <div className="link">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
          </div>

          <div className="link">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
          </div>

          <div className="link">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
          </div>

          <div className="link">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
          </div>
        </div>
        <hr />
        <div className="link__socials">
          <div className="logo">
            <h2>TiopTop.</h2>
            <span>© TiopTop International Ltd. 2023</span>
          </div>
          <div className="icons">
            <div className="socials">
              <img src={twitter} alt="" />
              <img src={facebook} alt="" />
              <img src={linkedin} alt="" />
              <img src={pinterest} alt="" />
              <img src={instagram} alt="" />
            </div>
            <div className="social">
              <img src={language} alt="" />
              <span>English</span>
            </div>
            <div className="social">
              <img src={coin} alt="" />
              <span>USD</span>
            </div>
            <img src={accessbility} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
