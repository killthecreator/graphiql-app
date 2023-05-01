import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const pages = [
  { id: 1, pathname: "Home" },
  { id: 2, pathname: "Editor" },
] as const;

const Header = () => {
  const { data: session } = useSession();
  return (
    <header>
      <nav className="flex h-10 justify-between bg-slate-600 px-20">
        <ul className="flex  items-center justify-center gap-11 ">
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
        {session && <button onClick={() => signOut()}>Sign Out</button>}
      </nav>
    </header>
  );
};
export default Header;
