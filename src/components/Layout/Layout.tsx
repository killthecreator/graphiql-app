import { Header } from "../Header";
import { Footer } from "../Footer";
import { Fragment, PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex h-[1000px] w-full grow flex-col items-center p-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};
