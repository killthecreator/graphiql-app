import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";

import { useTranslation } from "next-i18next";

interface ProfileCardProps {
  name: string;
  descr: string;
  imageLink: StaticImageData;
  imageAlt: string;
}

import Image, { StaticImageData } from "next/image";

export const ProfileCard = ({ data }: { data: ProfileCardProps }) => {
  const { t } = useTranslation("home");

  const { name, descr, imageLink, imageAlt } = data;

  return (
    <Card className="m-auto grid h-full max-w-[400px] sm:max-w-none">
      <CardHeader>
        <CardTitle>{t(name)}</CardTitle>
        <CardDescription>{t(descr)}</CardDescription>
      </CardHeader>
      <CardContent className="self-end">
        <Image
          className="aspect-[3/4] object-cover"
          src={imageLink}
          alt={imageAlt}
        />
      </CardContent>
    </Card>
  );
};
