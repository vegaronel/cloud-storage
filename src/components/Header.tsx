import { Links } from "../types/Types";
import { Link } from "react-router";
function Header() {
  return (
    <header className="flex items-center justify-between px-4 bg-slate-100">
      <p>Logo</p>
      <ul className="flex items-center gap-2 p-2">
        {links.map((item, index) => (
          <Link className="px-4 py-2" to={item.href} key={index}>
            {item.link}
          </Link>
        ))}
      </ul>
    </header>
  );
}

export default Header;

const links: Links[] = [
  {
    link: "Home",
    href: "/",
  },
  {
    link: "Login",
    href: "/login",
  },
];
