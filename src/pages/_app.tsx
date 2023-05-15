import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { Layout } from "~/components/Layout";
import "~/styles/globals.css";

import { Provider } from "react-redux";
import { store } from "~/rtk";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "~/components/Fallback";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={store}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default MyApp;
