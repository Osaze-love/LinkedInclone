import React from "react";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import "./Main.css";

function Main() {
  return (
    <div className="Main">
      <div className="nav">
        <div className="navImage">
          <img src="./images/LinkedIn_Logo.svg.png" alt="" />
        </div>
        <ul>
          <Link to="join">
            <li className="navJoin">Join Now</li>
          </Link>
          <Link to="signIn">
            <li className="navSignIn">Sign In</li>
          </Link>
        </ul>
      </div>
      <Banner />
    </div>
  );
}

export default Main;
