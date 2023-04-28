import { type NextPage } from "next";

import Head from "next/head";
import Link from "next/link";

import { signIn } from "next-auth/react";

import { useState } from "react";
import { useSession } from "next-auth/react";

import Login from "~/components/Login/Login";

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
        <Login></Login>
      )}
    </>
  );
};

export default Home;
