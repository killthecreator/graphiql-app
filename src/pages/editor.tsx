import { type NextPage } from "next";

import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Input,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  GraphqlResponseSkeleton,
} from "~/components/ui";

import {
  setResponseText,
  setIsError,
  setError,
  useGraphqlMutation,
  useAppSelector,
  useAppDispatch,
  setHeaders,
  type Headers,
  type ErrorType,
} from "~/rtk";

import {
  type MouseEventHandler,
  Suspense,
  useState,
  type ChangeEventHandler,
  useRef,
  useEffect,
  type FocusEventHandler,
} from "react";

import {
  Doc01Welcome,
  Doc02Examples,
  SomeDoc,
  SchemaDoc,
} from "~/components/Documentation";
import { Error } from "~/components/Error";

import {
  MonacoEditor,
  MonacoVariables,
  MonacoResponse,
} from "~/components/Monaco";
import { queries, types } from "~/data";
import { validHeader } from "~/validation";

const Editor: NextPage = () => {
  const [graphql] = useGraphqlMutation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { data, schema, error } = useAppSelector((state) => state);

  const headersAccordion = useRef<HTMLDivElement>(null);
  const lastKeyInput = useRef<HTMLInputElement>(null);
  const lastValueInput = useRef<HTMLInputElement>(null);

  const [focused, setFocused] = useState<HTMLInputElement | null>(null);
  const [changed, setChanged] = useState<boolean>(false);

  const { t } = useTranslation("editor");

  useEffect(() => {
    const keyInputs = headersAccordion.current?.querySelectorAll(
      ".key"
    ) as NodeListOf<HTMLInputElement>;
    const valueInputs = headersAccordion.current?.querySelectorAll(
      ".value"
    ) as NodeListOf<HTMLInputElement>;
    if (
      focused === lastKeyInput.current &&
      focused !== null &&
      keyInputs.length > 1
    ) {
      focused.value = "";
      const inputToFocus = Array.from(keyInputs).at(-2) as HTMLInputElement;
      inputToFocus.focus();
      setFocused(inputToFocus);
    }

    if (
      focused === lastValueInput.current &&
      focused !== null &&
      valueInputs.length > 1
    ) {
      focused.value = "";
      const inputToFocus = Array.from(valueInputs).at(-2) as HTMLInputElement;
      inputToFocus.focus();
      setFocused(inputToFocus);
    }
  }, [changed]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsLoading(true);
    const headersWithoutEmpty: Headers = {};
    Object.keys(data.headers).forEach((key) => {
      if (key) headersWithoutEmpty[key] = data.headers[key] as string;
    });
    graphql({
      query: data.editorText,
      variables: data.variables,
      headers: headersWithoutEmpty,
    })
      .unwrap()
      .then((resp) => {
        const stringified = JSON.stringify(resp.data, null, 4);
        dispatch(setResponseText(stringified));
        dispatch(setIsError(false));
      })
      .catch((error) => {
        const errorData: ErrorType =
          typeof error.status === "string"
            ? {
                errors: [
                  {
                    message: error.error,
                    code: error.data,
                  },
                ],
              }
            : {
                errors: error.data.errors.map(
                  (err: { message: string; extensions: { code: string } }) => ({
                    message: err.message,
                    code: err.extensions.code,
                  })
                ),
              };
        dispatch(setResponseText(""));
        dispatch(setIsError(true));
        dispatch(setError(errorData));
      })
      .finally(() => setIsLoading(false));
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(e.target);
    if (e.target.value === null) e.target.value = "";
    headersSetting();
  };

  const handleHeaderInputs: ChangeEventHandler<HTMLInputElement> = () => {
    headersSetting();
    setChanged(!changed);
  };

  const headersSetting = () => {
    const keyInputs = headersAccordion.current?.querySelectorAll(
      ".key"
    ) as NodeListOf<HTMLInputElement>;
    const valueInputs = headersAccordion.current?.querySelectorAll(
      ".value"
    ) as NodeListOf<HTMLInputElement>;

    const newHeaders: Headers = {};
    keyInputs.forEach((keyInput: HTMLInputElement, i: number) => {
      const key = keyInput.value as keyof typeof newHeaders;
      const val = valueInputs[i]?.value as string;
      newHeaders[key] = val;
    });
    let allowSet = true;
    Object.entries(newHeaders).forEach((entrie) => {
      entrie.forEach((el) => {
        if (!validHeader(el) && el !== "") allowSet = false;
      });
    });
    if (allowSet) dispatch(setHeaders(newHeaders));
  };

  return (
    <>
      <Head>
        <title>Editor</title>
      </Head>
      <section className="flex h-full w-full grow flex-col sm:flex-row">
        <article className="flex flex-col sm:w-6/12">
          <Card className="m-1 flex h-80 grow flex-col">
            <CardHeader>
              <CardTitle>{t("req editor")}</CardTitle>
              <CardDescription>{t("req descr")}</CardDescription>
            </CardHeader>
            <CardContent className="flex grow flex-col overflow-x-hidden">
              <MonacoEditor />
            </CardContent>
            <CardFooter>
              <Button onClick={handleButtonClick}>{t("send")}</Button>
            </CardFooter>
          </Card>

          <Card className="m-1">
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("vars editor")}</AccordionTrigger>
                  <AccordionContent className="p-1">
                    <MonacoVariables />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="m-1">
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("headers editor")}</AccordionTrigger>
                  <AccordionContent
                    className="flex w-full p-1"
                    ref={headersAccordion}
                  >
                    {Object.entries(data.headers).map((entry, index) => (
                      <div key={`wrapperKey${index}`}>
                        {(entry[0] !== "" || entry[1] !== "") && (
                          <div className="flex w-full" key={`divKey${index}`}>
                            <Input
                              className="key m-1 w-6/12"
                              key={`myKey${index}`}
                              defaultValue={entry[0]}
                              onChange={handleHeaderInputs}
                              onFocus={handleInputFocus}
                            />
                            <Input
                              className="value m-1 w-6/12"
                              key={`myVal${index}`}
                              defaultValue={entry[1]}
                              onChange={handleHeaderInputs}
                              onFocus={handleInputFocus}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="flex w-full" key="divKeyIndex">
                      <Input
                        ref={lastKeyInput}
                        className="key last-key m-1 w-6/12"
                        key="someuniquekey"
                        onChange={handleHeaderInputs}
                        onFocus={handleInputFocus}
                      />
                      <Input
                        ref={lastValueInput}
                        className="value last-value m-1 w-6/12"
                        key="onemoreuniquekey"
                        onChange={handleHeaderInputs}
                        onFocus={handleInputFocus}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </article>

        <article className="flex flex-col sm:w-6/12">
          <Card className="m-1 flex h-80 grow flex-col">
            <CardHeader>
              <CardTitle>{t("res section")}</CardTitle>
              <CardDescription>{t("res descr")}</CardDescription>
            </CardHeader>
            <CardContent className="flex grow flex-col overflow-x-hidden">
              <div className="flex grow flex-wrap overflow-x-hidden">
                {isLoading ? <GraphqlResponseSkeleton /> : <MonacoResponse />}
              </div>
            </CardContent>
            <CardFooter>{error.isError && <Error />}</CardFooter>
          </Card>
          {schema.isSchema && (
            <Card className="m-1 flex h-80 max-h-screen grow flex-col overflow-y-scroll">
              <CardHeader>
                <CardTitle>{t("docs explorer")}</CardTitle>
                <CardDescription>{t("lazy loaded")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<GraphqlResponseSkeleton />}>
                  <Doc01Welcome />
                </Suspense>
                <Suspense fallback={<GraphqlResponseSkeleton />}>
                  <Doc02Examples />
                </Suspense>
                <Suspense fallback={<GraphqlResponseSkeleton />}>
                  <SchemaDoc />
                </Suspense>
                {types
                  .filter((docUrl) => data.responseText.includes(docUrl))
                  .map((docUrl, index) => (
                    <Suspense key={`docUrl${index}`}>
                      <SomeDoc url={`types/${docUrl}`} />
                    </Suspense>
                  ))}
                {queries
                  .filter((docUrl) => data.responseText.includes(docUrl))
                  .map((docUrl, index) => (
                    <Suspense key={`otherDocUrl${index}`}>
                      <SomeDoc url={`queries/${docUrl}`} />
                    </Suspense>
                  ))}
              </CardContent>
            </Card>
          )}
        </article>
      </section>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "editor"])),
  },
});

export default Editor;
