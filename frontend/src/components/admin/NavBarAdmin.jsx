import { NavLink as Link } from "react-router-dom";
import navbardataadmin from "../../datas/admin/NavBarDataAdmin.json";

export default function NavBar() {
  return (
    <nav>
      <ul>
        {navbardataadmin.map((item) => (
          <li key={item.id}>
            <Link to={item.linkurl}>{item.linkname}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
