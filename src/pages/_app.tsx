import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { Layout } from "~/components/Layout";
import "~/styles/globals.css";

import { Provider } from "react-redux";
import { store } from "~/rtk";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "~/components/Fallback";

import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  NProgress.configure({ easing: "ease", speed: 500 });

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={store}>
        <SessionProvider session={session}>
          <Head>
            <meta name="description" content="GraphiQL App" />
            <link rel="icon" href="/favicon32.png" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default appWithTranslation(MyApp);
