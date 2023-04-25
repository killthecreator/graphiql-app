import { Header } from "../Header";
import { Footer } from "../Footer";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="max-w-xl flex-col items-center">{children}</main>
      <Footer />
    </>
  );
};
