import Link from "next/link";

const pages = [
  { id: 1, name: "Home" },
  { id: 2, name: "Login" },
  { id: 3, name: "Editor" },
];

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="flex h-10 items-center justify-center gap-11 bg-slate-600">
          {pages.map((page) => (
            <li key={page.id}>
              <Link
                href={
                  page.name === "Home" ? "/" : "/" + page.name.toLowerCase()
                }
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
