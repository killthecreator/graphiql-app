import {
  act,
  getByTestId,
  render,
  screen,
  renderHook,
} from "@testing-library/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { Fallback } from "~/components/Fallback";
import { Layout } from "~/components/Layout";
import Home from "~/pages";
import { mainUrl } from "~/rtk";
import fetchMock from "jest-fetch-mock";
import { store } from "../test/utils/testStore";

import useRouterMock from "./mocks/useRouter";
import useTranslationMock from "./mocks/useTranslation";
import { I18nextProvider, useTranslation } from "react-i18next";

const fakeData = {};

beforeAll(() => {
  fetchMock.mockOnceIf(mainUrl, () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify({ fakeData }),
    })
  );

  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  useRouter.mockImplementation(useRouterMock);
});

describe("Home", () => {
  test("render homepage", () => {
    const mockSession: Session = {
      expires: "1",
      user: {
        id: "fakeId",
        name: "fakeName",
        email: "fakeEmail",
        image: "fakeImage",
      },
    };

    const t = renderHook(() => useTranslation());

    render(
      <ErrorBoundary FallbackComponent={Fallback}>
        <Provider store={store}>
          <SessionProvider session={mockSession}>
            <Head>
              <meta name="description" content="GraphiQL App" />
              <link rel="icon" href="/favicon32.png" />
            </Head>
            <I18nextProvider i18n={t.result.current.i18n}>
              <Layout>
                <Home />
              </Layout>
            </I18nextProvider>
          </SessionProvider>
        </Provider>
      </ErrorBoundary>
    );

    const layout = screen.getByTestId("layout");
    expect(layout).toBeTruthy();
    expect(fetchMock).toBeCalled();
  });
});
