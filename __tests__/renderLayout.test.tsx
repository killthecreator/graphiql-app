
import { act, getByTestId, render, screen } from '@testing-library/react';
import { Session } from 'next-auth';
import { SessionProvider, useSession } from "next-auth/react";
import Head from 'next/head';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { Fallback } from '~/components/Fallback';
import { Layout } from '~/components/Layout';
import Home from '~/pages';
import { mainUrl } from '~/rtk';
import fetchMock from "jest-fetch-mock";
import { store } from '../test-utils/testStore';

const fakeData = {

};

beforeAll(() => {
  fetchMock.mockOnceIf(mainUrl, () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify({ fakeData }),
    })
  );
});

describe('Home', () => {

  test('render homepage', () => {

  const mockSession: Session = {
    expires: "1",
    user: {
      id: 'fakeId',
      name: 'fakeName',
      email: 'fakeEmail',
      image: 'fakeImage'
    },
  };
  const rendering = render(
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
  const errorButton = screen.getByTestId('error-button');
  expect(errorButton).toBeTruthy();
  act(() => errorButton.click());
  const errorMessage = screen.queryByTestId('error-message');
  expect(errorMessage).toBeTruthy();
  console.log(errorMessage?.innerHTML); //NextRouter was not mounted. https://nextjs.org/docs/messages/next-router-not-mounted

  //const layout = screen.getByTestId('layout');
  //expect(layout).toBeTruthy();
  //expect(fetchMock).toBeCalled();
  });

})
