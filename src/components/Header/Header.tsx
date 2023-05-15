import { signOut, useSession } from "next-auth/react";

import { useState, useEffect, useCallback } from "react";

import { Button, Switch } from "~/components/ui";

import { Sun, Moon } from "lucide-react";
import { cn } from "~/lib/utils";

import { setIsDay, useAppDispatch } from "../../rtk";

import { useRouter } from "next/router";

export const Header = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [headerScroll, setHeaderScroll] = useState("-sm");

  const handleThemeSwitch = () => {
    const isDark = document.body.classList.contains("dark") as boolean;
    dispatch(setIsDay(isDark));
  };

  const handleLangSwitch = () => {
    console.log("Need a lang switch state");
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > 8) return setHeaderScroll("-lg");
    if (window.scrollY > 6) return setHeaderScroll("-md");
    if (window.scrollY > 4) return setHeaderScroll("");
    if (window.scrollY <= 4) return setHeaderScroll("-sm");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        `shadow${headerScroll}`,
        "fixed z-10 flex h-16 w-screen items-center px-2 backdrop-blur-[2px] dark:shadow-[#ffffff1a]"
      )}
    >
      <nav className="w-full px-4">
        <ul className="flex justify-between">
          <li className="flex gap-10">
            <div className="flex items-center">
              <span className="mx-2 font-semibold">ENG</span>
              <div className="mx-2">
                <Switch onClick={handleLangSwitch} className="mt-2" />
              </div>
              <span className="mx-2 font-semibold">RU</span>
            </div>
            <div className="flex flex-nowrap items-center">
              <Sun className="mx-2" />
              <div className="mx-2">
                <Switch onClick={handleThemeSwitch} className="mt-2" />
              </div>
              <Moon className="ml-2 mr-4" />
            </div>
          </li>
          <li>
            {session && (
              <Button
                onClick={async () => {
                  const data = await signOut({
                    redirect: false,
                    callbackUrl: "/",
                  });
                  router.push(data.url);
                }}
              >
                Sign Out
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
