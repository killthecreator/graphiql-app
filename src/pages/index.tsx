import { type NextPage } from "next";

import Head from "next/head";
import Link from "next/link";

import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>GraphiQL</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? (
        <Link href="/editor">
          You are successfully logged-in! Go to the editor
        </Link>
      ) : (
        <Link href="/login">Sign In / Sign Up</Link>
      )}
    </>
  );
};

export default Home;
