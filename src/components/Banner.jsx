import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="banner">
      <div className="bannerText">
        <p>Welcome to your professional community</p>
        <Link to="signIn">
          <button>Sign In</button>
        </Link>
      </div>
      <img src="./images/mainImage.jpg" alt="" />
    </div>
  );
}

export default Banner;
