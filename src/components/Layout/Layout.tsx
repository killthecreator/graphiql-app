import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="max-w-xl flex-col items-center">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
