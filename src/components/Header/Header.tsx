import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

import { Button } from "~/components/ui/button";

import { Switch } from "~/components/ui/switch";

import { Sun, Moon } from "lucide-react";

import { setIsDay, AppDispatch, RootState, useAppDispatch, useAppSelector } from '../../rtk';

import { MouseEvent } from 'react';

const pages = [
  { id: 1, pathname: "Home" },
  { id: 2, pathname: "Editor" },
] as const;

export const Header = () => {

  const dispatch = useAppDispatch();
  const { isDay } = useAppSelector(state => state.theme);
            
  const { data: session } = useSession();

  const handleClick = () => {
    const isDark = document.body.classList.contains('dark') as boolean;
    dispatch(setIsDay(isDark));
  };

  return (
    <header className="px-2 pt-2 flex justify-between">
      <NavigationMenu className="grow-0">
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
      </NavigationMenu>
      <div className="flex flex-nowrap items-center">
        <Sun className="mx-2"/>
        <div className="mx-2">
          <Switch onClick={handleClick} className="mt-2"/>
        </div>
        <Moon className="ml-2 mr-4"/>
        {session && <Button onClick={() => signOut()}>Sign Out</Button>}
      </div>
    </header>
  );
};
