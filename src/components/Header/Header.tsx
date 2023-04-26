import Link from "next/link";

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

import { useDispatch, useSelector } from 'react-redux';
import { setIsDay, AppDispatch, RootState } from '../../rtk';

import { MouseEvent } from 'react';

const pages = [
  { id: 1, pathname: "Home" },
  { id: 2, pathname: "Login" },
  { id: 3, pathname: "Editor" },
] as const;

export const Header = () => {

  const clickHandler = () => document.body.classList.toggle('dark');

  const dispatch = useDispatch<AppDispatch>();
  const { isDay } = useSelector((state: RootState) => state.data);

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
        <Button>Sign Out</Button>
      </div>
    </header>
  );
};
