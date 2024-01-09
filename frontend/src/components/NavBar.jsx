import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBarData from "../datas/NavBarData.json";
import NavBarDataConnected from "../datas/NavBarDataConnected.json";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.scss";
import logo from "../assets/images/logo.png";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);
  const navbardata = user ? NavBarDataConnected : NavBarData;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="Your Logo" className="logo" />
      </div>
      <h1 className="title">Origin's Digital</h1>
      <button
        className={`burger-menu ${showMenu ? "open" : ""}`}
        type="button"
        onClick={toggleMenu}
      >
        &#9776;
      </button>
      <ul className={`nav-links ${showMenu ? "show-menu" : ""}`}>
        {navbardata.map((item) => (
          <li key={item.id}>
            {item.linkname === "Logout" ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMenu();
                  navigate("/");
                }}
              >
                {item.linkname}
              </button>
            ) : (
              <Link to={item.linkurl} onClick={closeMenu}>
                {item.linkname}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
