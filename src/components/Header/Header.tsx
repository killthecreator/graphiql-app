import Link from "next/link";

const pages = ["Home", "Login", "Editor"];

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="flex h-10 items-center justify-center gap-11 bg-slate-600">
          {pages.map((page) => (
            <Link href={page === "Home" ? "/" : "/" + page.toLowerCase()}>
              {page}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
