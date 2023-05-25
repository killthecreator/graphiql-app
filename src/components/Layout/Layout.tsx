import { Header } from "../Header";
import { Footer } from "../Footer";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-[100vh] flex-col" data-testid="layout">
      <Header />
      <main className="flex w-full grow flex-col items-center p-1 pt-24 sm:pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};
