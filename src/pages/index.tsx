import { type NextPage } from "next";

import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Login from "~/components/Login/Login";

import { Button } from "~/components/ui";

import graphQlPic from '~/assets/graphql.webp';
import pokemonApi from '~/assets/pokemon.webp';
import monacoPic from '~/assets/monaco.webp';

import { CustomCard } from "~/components/CustomCard";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation("home");

  const articleClass = 'flex gap-[5vw] px-[5vw] flex-col sm:flex-row';
  const imageClass = 'sm:w-6/12 rounded-lg';

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
      <section className="flex flex-col gap-[5vw]">
        <article className={articleClass}>
          <Image
            className={imageClass}
            src={graphQlPic}
            alt="graphQLpicture"
          />
          <CustomCard
            title="GraphiQL"
            description="GraphiQL is a playground/IDE for graphQL requests."
          >
            // TODO Here we should write some description
          </CustomCard>
        </article>
        <article className={articleClass}>
          <CustomCard
            title="Pokemon API"
            description="Extensive Pokemon GraphQL API"
          >
            <p className="mb-4">GraphQL-Pokemon is a GraphQL API that provides extensive Pokémon data. Unlike contemporary APIs this API focusses on speed, accuracy and data quality. API provides fully generated client-side TypeScript typings, images, information about various assets in Pokemon: Pokedex, Items, AbilitiesMoves, Learnsets, Type matchups</p>
            <Button variant="outline">
              <Link href="https://graphql-pokemon.js.org/" >API Documentation</Link>
            </Button>
          </CustomCard>
          <Image
            className={imageClass}
            src={pokemonApi}
            alt="pokemonApi"
          />
        </article>
        <article className={articleClass}>
          <Image
            className={imageClass}
            src={monacoPic}
            alt="monaco-editor-react__logo"
          />
          <CustomCard
            title="Monaco Editor for React"
            description="@monaco-editor/react"
          >
            <p className="mb-4">We use Monaco Editor for React in our app. The monaco-editor is a well-known web technology based code editor that powers VS Code. This library handles the setup process of the monaco-editor and provides a clean API to interact with monaco from any React environment</p>
            <Button variant="outline">
              <Link href="https://www.npmjs.com/package/@monaco-editor/react" >@monaco-editor/react</Link>
            </Button>
          </CustomCard>
        </article>
      </section>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["home", "common", "login"])),
  },
});
