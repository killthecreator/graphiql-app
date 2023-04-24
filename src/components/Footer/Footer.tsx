import Link from "next/link";
import Image from "next/image";

import ghLogo from "./../../assets/github.png";
import rsLogo from "./../../assets/rs_school_js.svg";

const ghNames = ["killthecreator", "HelgaAthame", "alexmegadrive"];

const Footer = () => {
  return (
    <footer className="flex items-center justify-between bg-slate-300">
      <ul className="flex justify-center gap-4">
        {ghNames.map((name) => (
          <li>
            {" "}
            <Link href={"https://github.com/" + name}>
              <Image className="w-10" src={ghLogo} alt="gh-logo"></Image>
            </Link>{" "}
          </li>
        ))}
      </ul>
      <span>2023</span>
      <Link href="https://rs.school/">
        <Image className="w-24" src={rsLogo} alt="rs-logo"></Image>
      </Link>
    </footer>
  );
};
export default Footer;
