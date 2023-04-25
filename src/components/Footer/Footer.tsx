import Link from "next/link";
import Image from "next/image";

import ghLogo from "./../../assets/github.png";
import rsLogo from "./../../assets/rs_school_js.svg";

const ghUsers = [
  { id: 1, name: "killthecreator" },
  { id: 2, name: "HelgaAthame" },
  { id: 3, name: "alexmegadrive" },
] as const;

const Footer = () => {
  return (
    <footer className="flex items-center justify-between bg-slate-300">
      <ul className="flex justify-center gap-4">
        {ghUsers.map((user) => (
          <li key={user.id}>
            <Link href={"https://github.com/" + user.name}>
              <Image className="w-10" src={ghLogo} alt="gh-logo" />
            </Link>{" "}
          </li>
        ))}
      </ul>
      <span>2023</span>
      <Link href="https://rs.school/">
        <Image className="w-24" src={rsLogo} alt="rs-logo" />
      </Link>
    </footer>
  );
};
export default Footer;
