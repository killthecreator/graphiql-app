import Link from "next/link";

const pages = [
  { id: 1, pathname: "Home" },
  { id: 2, pathname: "Login" },
  { id: 3, pathname: "Editor" },
] as const;

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="flex h-10 items-center justify-center gap-11 bg-slate-600">
          {pages.map((page) => (
            <li key={page.id}>
              <Link
                href={
                  page.pathname === "Home"
                    ? "/"
                    : "/" + page.pathname.toLowerCase()
                }
              >
                {page.pathname}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
