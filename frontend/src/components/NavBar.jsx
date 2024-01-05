import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import navbardata from "../datas/NavBarData.json";
import "../styles/Navbar.scss";

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav>
      <button className="burger-menu" type="button" onClick={toggleMenu}>
        &#9776;
      </button>
      <ul className={`nav-links ${showMenu ? "show-menu" : ""}`}>
        {showMenu &&
          navbardata.map((item) => (
            <li key={item.id}>
              <Link to={item.linkurl} onClick={closeMenu}>
                {item.linkname}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default NavBar;
