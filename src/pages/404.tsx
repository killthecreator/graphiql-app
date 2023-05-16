import { type NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Custom404: NextPage = () => {
  const { t } = useTranslation("404");
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <section className="flex h-full grow flex-col items-center justify-center">
        <Card className="">
          <CardHeader>
            <CardTitle>404</CardTitle>
            <CardDescription>{t("not found")}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">
              <Link href="/">{t("to homepage")}</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default Custom404;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "404"])),
  },
});
