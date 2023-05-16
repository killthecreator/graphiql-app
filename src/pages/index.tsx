import { type NextPage } from "next";

import Head from "next/head";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Login from "~/components/Login/Login";

import { Button } from "~/components/ui";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation("home");

  return (
    <>
      <Head>
        <title>GraphiQL</title>
      </Head>
      {session ? (
        <Button className="fixed right-8 top-20">
          <Link href="/editor">{t("go to editor")}</Link>
        </Button>
      ) : (
        <div className="mr-2 mt-4 flex gap-2 self-end">
          <Login mode="sign-in">
            <Button>{t("sign in")}</Button>
          </Login>
          <Login mode="sign-up">
            <Button>{t("sign up")}</Button>
          </Login>
        </div>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["home", "common", "login"])),
  },
});
