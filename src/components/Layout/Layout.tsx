import { Header } from "../Header";
import { Footer } from "../Footer";
import { Fragment, PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <main className="flex flex-col items-center grow p-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};
