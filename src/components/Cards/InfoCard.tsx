import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "../ui";

import { useTranslation } from "next-i18next";

interface InfoCardProps {
  title: string;
  descr: string;
  text: string;
  link: string;
  linkText: string;
}

import Link from "next/link";

export const InfoCard = ({ data }: { data: InfoCardProps }) => {
  const { t } = useTranslation("home");

  const { title, descr, text, link, linkText } = data;

  return (
    <Card className="sm:min-w-6/12 grid grow grid-rows-[auto_auto_1fr]">
      <CardHeader>
        <CardTitle>{t(title)}</CardTitle>
        <CardDescription>{t(descr)}</CardDescription>
      </CardHeader>
      <CardContent>{t(text)}</CardContent>
      <CardFooter>
        <Button variant="outline" className="mt-auto">
          <Link href={link}>{t(linkText)}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
