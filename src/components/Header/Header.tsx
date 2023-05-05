import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { useState, useEffect, useCallback } from "react";

import {
  Button,
  Switch,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "~/components/ui";

import { Sun, Moon } from "lucide-react";
import { cn } from "~/lib/utils";

import {
  setIsDay,
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../rtk";

const pages = [
  { id: 1, pathname: "Home" },
  { id: 2, pathname: "Editor" },
] as const;

export const Header = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { isDay } = useAppSelector((state) => state.theme);

  const [headerScroll, setHeaderScroll] = useState("-sm");

  const handleClick = () => {
    const isDark = document.body.classList.contains("dark") as boolean;
    dispatch(setIsDay(isDark));
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
        "fixed flex h-16 w-full justify-end px-2 pt-2 backdrop-blur-[2px] dark:shadow-[#ffffff1a]"
      )}
    >

      <div className="flex flex-nowrap items-center">
        <Sun className="mx-2" />
        <div className="mx-2">
          <Switch onClick={handleClick} className="mt-2" />
        </div>
        <Moon className="ml-2 mr-4" />
        {session && <Button onClick={() => signOut()}>Sign Out</Button>}
      </div>
    </header>
  );
};

/*<NavigationMenu className="grow-0">
        <NavigationMenuList>
          {pages.map((page) => (
            <NavigationMenuItem className="hover:cursor-pointer" key={page.id}>
              <Link
                href={
                  page.pathname === "Home"
                    ? "/"
                    : "/" + page.pathname.toLowerCase()
                }
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {page.pathname}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu> */
