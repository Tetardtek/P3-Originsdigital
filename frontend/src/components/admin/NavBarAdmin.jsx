import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import navbardataadmin from "../../datas/admin/NavBarDataAdmin.json";
import "../../styles/NavbarAdmin.scss";

function NavBarAdmin() {
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
          navbardataadmin.map((item) => (
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

export default NavBarAdmin;
