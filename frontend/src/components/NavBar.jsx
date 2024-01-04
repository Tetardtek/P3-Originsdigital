import { NavLink as Link } from "react-router-dom";
import navbardata from "../datas/NavBarData.json";

export default function NavBar() {
  return (
    <nav>
      <ul>
        {navbardata.map((item) => (
          <li key={item.id}>
            <Link to={item.linkurl}>{item.linkname}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
