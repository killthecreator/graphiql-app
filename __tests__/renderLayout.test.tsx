
import { render, screen } from '@testing-library/react';
import { Session } from 'next-auth';
import { SessionProvider, useSession } from "next-auth/react";
import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { Fallback } from '~/components/Fallback';
import { Layout } from '~/components/Layout';
import Home from '~/pages';
import { store } from '~/rtk';

describe('Home', () => {
  const mockSession: Session = {
    expires: "1",
    user: {
      id: 'fakeId',
      name: 'fakeName',
      email: 'fakeEmail',
      image: 'fakeImage'
    },
  };
  render(
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={store}>
        <SessionProvider session={mockSession}>
          <Head>
            <meta name="description" content="GraphiQL App" />
            <link rel="icon" href="/favicon32.png" />
          </Head>
          <Layout>
            <Home />
          </Layout>
        </SessionProvider>
      </Provider>
    </ErrorBoundary>
  );

})
