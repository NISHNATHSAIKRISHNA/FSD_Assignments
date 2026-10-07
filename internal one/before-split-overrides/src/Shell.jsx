import { Link } from "react-router-dom";

export default function Shell({ children, onIntent }) {
  const links = [
    ["/", "Dashboard"],
    ["/reports", "Reports"],
    ["/settings", "Settings"],
    ["/admin", "Admin"],
  ];
  return (
    <>
      <nav>
        {links.map(([to, label]) => (
          <Link
            key={to}
            to={to}
            onMouseEnter={() => onIntent?.(to)}
            onFocus={() => onIntent?.(to)}
          >
            {label}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
    </>
  );
}
