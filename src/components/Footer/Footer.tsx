import Image from "next/image";

import rsLogo from "~/assets/rs_school_js.svg";

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

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const ghUsers = [
  { id: 1, name: "killthecreator" },
  { id: 2, name: "HelgaAthame" },
  { id: 3, name: "alexmegadrive" },
] as const;

export const Footer = () => {
  return (
    <footer className="px-2">
      <NavigationMenu className="grid w-full grid-cols-3 gap-4">
        <NavigationMenuList className="justify-start">
          {ghUsers.map((user) => (
            <NavigationMenuItem key={user.id}>
              <NavigationMenuLink
                className={" h-20 " + navigationMenuTriggerStyle()}
                href={"https://github.com/" + user.name}
              >
                <Avatar>
                  <AvatarImage
                    src={"https://github.com/" + user.name + ".png"}
                  />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem key={2023}>
            <span className="font-medium">2023</span>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="justify-end">
          <NavigationMenuItem key={2024}>
            <NavigationMenuLink
              className={"h-20 " + navigationMenuTriggerStyle()}
              href="https://rs.school/"
            >
              <Image className="w-24 dark:invert" src={rsLogo} alt="rs-logo" />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </footer>
  );
};
