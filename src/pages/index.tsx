import { type NextPage } from "next";

import Head from "next/head";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import graphQlPic from "~/assets/graphql.webp";
import pokemonApi from "~/assets/pokemon.webp";
import monacoPic from "~/assets/monaco.webp";

import RSSchool from "~/assets/rs_school_js.svg";
import ReactCourse from "~/assets/react-course.webp";

import { Example } from "~/components/Example";
import { InfoCard, ProfileCard } from "~/components/Cards";
import { profileCards, dataCards } from "~/data";

const articleClass =
  "grid gap-[5vw] grid-cols-1 even:sm:grid-cols-[1fr_50%] odd:sm:grid-cols-[50%_1fr]";
const imageClass =
  "rounded-lg w-full object-contain h-fit self-center order-first sm:order-none";

const introspectiveExample = `
{
  __schema {
    types {
      name
    }
  }
}
`;

const Home: NextPage = () => (
    <>
      <Head>
        <title>GraphiQL</title>
      </Head>
      <section className="flex max-w-[1400px] flex-col gap-[5vw] px-[5vw] py-5">
        <article className={articleClass}>
          <Image className={imageClass} src={graphQlPic} alt="graphQLpicture" />
          <InfoCard data={dataCards["graphiql"]} />
        </article>
        <article className={articleClass}>
          <InfoCard data={dataCards["pokemon"]} />
          <Image className={imageClass} src={pokemonApi} alt="pokemonApi" />
        </article>
        <article className={articleClass}>
          <Image
            className={imageClass}
            src={monacoPic}
            alt="monaco-editor-react__logo"
          />
          <InfoCard data={dataCards["monaco"]} />
        </article>
        <article className={articleClass}>
          <InfoCard data={dataCards["documentation"]} />
          <Example value={introspectiveExample} />
        </article>

        <ul className="grid grid-cols-1 gap-[2vw] sm:grid-cols-3">
          {profileCards.map((item) => (
            <li key={item.id}>
              <ProfileCard data={item.data} />
            </li>
          ))}
        </ul>
        <article className={articleClass}>
          <Image className={imageClass} src={RSSchool} alt="rs-school__logo" />
          <InfoCard data={dataCards["rs"]} />
        </article>
        <article className={articleClass}>
          <InfoCard data={dataCards["react-course"]} />
          <Image className={imageClass} src={ReactCourse} alt="react-course" />
        </article>
      </section>
    </>
);

export default Home;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["home", "common", "login"])),
  },
});
