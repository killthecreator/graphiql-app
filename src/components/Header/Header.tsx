import { signOut, useSession } from "next-auth/react";

import { useState, useEffect, useCallback } from "react";

import { Button, Switch } from "~/components/ui";

import { Sun, Moon } from "lucide-react";
import { cn } from "~/lib/utils";

import { setIsDay, useAppDispatch } from "~/rtk";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import Link from "next/link";

import Login from "~/components/Login/Login";

export const Header = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { locale: curLocale, locales, push, pathname } = router;
  const { t } = useTranslation("common");
  const [display, setDisplay] = useState(false);

  if (router.pathname === "/" && display === false) {
    setDisplay(true);
  } else if (router.pathname !== "/" && display === true) {
    setDisplay(false);
  }

  const [headerScroll, setHeaderScroll] = useState("-sm");

  const handleThemeSwitch = () => {
    const isDark = document.body.classList.contains("dark") as boolean;
    dispatch(setIsDay(isDark));
  };

  const handleLangSwitch = () => {
    const newLocale = locales!.find((locale) => locale !== curLocale);
    push(pathname, undefined, { locale: newLocale });
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
  }, [handleScroll]);

  return (
    <header
      className={cn(
        `shadow${headerScroll}`,
        "fixed z-10 flex h-24 w-screen items-center px-2 backdrop-blur-[2px] dark:shadow-[#ffffff1a] sm:h-16"
      )}
    >
      <nav className="w-full py-2 sm:px-4">
        <ul className="grid w-full grid-cols-1 gap-y-2 sm:grid-cols-2">
          <li className="flex justify-center  gap-2 sm:justify-start sm:gap-10">
            <div className="flex items-center">
              <span className="mx-2 font-semibold">ENG</span>
              <div className="mx-2">
                <Switch
                  defaultChecked={curLocale === "ru"}
                  onClick={handleLangSwitch}
                  className="mt-2"
                />
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
          <li className="flex grow items-center justify-center gap-2 sm:justify-end">
            {display &&
              (session ? (
                <Button>
                  <Link href="/editor">{t("go to editor")}</Link>
                </Button>
              ) : (
                <div>
                  <Login mode="sign-in">
                    <Button className="mr-4">{t("sign in")}</Button>
                  </Login>
                  <Login mode="sign-up">
                    <Button>{t("sign up")}</Button>
                  </Login>
                </div>
              ))}
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
                {t("sign out")}
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
