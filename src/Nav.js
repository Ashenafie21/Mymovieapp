import React, { useEffect, useState } from "react";
import "./Nav.css";
import netflixLogo from "./image/netflixlogo.png";
import netflixAvator from "./image/nextflix_avatar.png";
function Nav() {
  const [show, handleShow] = useState(false);
  const transitonNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitonNavBar);
    return () => window.removeEventListener("scroll", transitonNavBar);
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          className="nav__logo"
          src={netflixLogo}
          alt="Netflix logo"
        />
        <img
          className="nav__avatar"
          src={netflixAvator}
          alt=" Netflix Avator"
        />
      </div>
    </div>
  );
}

export default Nav;
