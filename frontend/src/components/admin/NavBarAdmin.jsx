import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import navbardataadmin from "../../datas/admin/NavBarDataAdmin.json";
import "../../styles/Navbar.scss";
import logo from "../../assets/images/logo.png";

function NavBarAdmin() {
  const [showMenu, setShowMenu] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setIsBurgerOpen(!isBurgerOpen);
  };

  const closeMenu = () => {
    setShowMenu(false);
    setIsBurgerOpen(false);
  };

  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="Your Logo" className="logo" />
      </div>
      <h1 className="title">Origin's Digital</h1>
      <button
        className={`burger-menu ${isBurgerOpen ? "open" : ""}`}
        type="button"
        onClick={toggleMenu}
      >
        &#9776;
      </button>
      <ul className={`nav-links ${showMenu ? "show-menu" : ""}`}>
        {showMenu &&
          navbardataadmin.map((item) => (
            <li key={item.linkname}>
              <Link to={item.linkurl} onClick={closeMenu}>
                {item.linkname}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default NavBarAdmin;
