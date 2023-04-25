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

const pages = [
  { id: 1, pathname: "Home" },
  { id: 2, pathname: "Login" },
  { id: 3, pathname: "Editor" },
] as const;

export const Header = () => {
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

      <Button>Sign Out</Button>
    </header>
  );
};
