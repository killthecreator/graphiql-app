import { type NextPage } from "next";

import Head from "next/head";

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
  ScrollArea,
  Textarea,
} from "~/components/ui";

import {
  setResponseText,
  setVariables,
  setIsSchema,
  setIsError,
  setError,
  useGraphqlMutation,
  useAppSelector,
  useAppDispatch,
  setHeaders,
  Headers,
  ErrorType,
} from "~/rtk";

import {
  ChangeEvent,
  FormEventHandler,
  MouseEventHandler,
  Suspense,
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useEffect,
  FocusEventHandler,
} from "react";

import GraphqlResponseSkeleton from "~/components/ui/graphqlResponseSkeleton";
import {
  Doc01Welcome,
  Doc02Examples,
  SomeDoc,
} from "~/components/Documentation";
import { Error } from "~/components/Error";

import {
  MonacoEditor,
  MonacoVariables,
  MonacoResponse,
} from "~/components/Monaco";
import { queries, types } from "~/consts";

const Editor: NextPage = () => {
  const [graphql, response] = useGraphqlMutation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);
  const schema = useAppSelector((state) => state.schema);
  const error = useAppSelector((state) => state.error);

  const headersAccordion = useRef<HTMLDivElement>(null);
  const lastKeyInput = useRef<HTMLInputElement>(null);
  const lastValueInput = useRef<HTMLInputElement>(null);

  const [focused, setFocused] = useState<HTMLInputElement | null>(null);
  const [changed, setChanged] = useState<boolean>(false);

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
  }, [changed]);

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsLoading(true);
    const headersWithoutEmpty: Headers = {};
    Object.keys(data.headers).forEach((key) => {
      if (key !== "") headersWithoutEmpty[key] = data.headers[key] as string;
    });
    const resp = graphql({
      query: data.editorText,
      variables: data.variables,
      headers: headersWithoutEmpty,
    })
      .unwrap()
      .then((resp) => {
        const stringified = JSON.stringify(resp.data, null, 4);
        dispatch(setResponseText(stringified));

        const isIntrospective = stringified.match(/\_\_\w/) !== null;
        dispatch(setIsSchema(isIntrospective));
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
        dispatch(setIsSchema(false));
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

  const handleHeaderInputs: ChangeEventHandler<HTMLInputElement> = (e) => {
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

    let newHeaders: Headers = {};
    keyInputs.forEach((keyInput: HTMLInputElement, i: number) => {
      const key = keyInput.value as keyof typeof newHeaders;
      const val = valueInputs[i]?.value as string;
      newHeaders[key] = val;
    });
    dispatch(setHeaders(newHeaders));
  };

  return (
    <>
      <Head>
        <title>Editor</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon32.png" />
      </Head>
      <section className="flex h-full w-full grow flex-col sm:flex-row">
        <article className="flex sm:w-6/12 flex-col">
          <Card className="m-1 flex grow flex-col h-80">
            <CardHeader>
              <CardTitle>Request Editor</CardTitle>
              <CardDescription>Wite your Grqphql request</CardDescription>
            </CardHeader>
            <CardContent className="flex grow flex-col overflow-x-hidden">
              <MonacoEditor />
            </CardContent>
            <CardFooter>
              <Button onClick={handleButtonClick}>Send</Button>
            </CardFooter>
          </Card>

          <Card className="m-1">
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Variables Editor</AccordionTrigger>
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
                  <AccordionTrigger>Headers Editor</AccordionTrigger>
                  <AccordionContent
                    className="flex w-full p-1"
                    ref={headersAccordion}
                  >
                    {Object.entries(data.headers).map((entry, index) => (
                      <>
                        {(entry[0] !== "" || entry[1] !== "") && (
                          <div className="flex w-full">
                            <Input
                              className="key m-1 w-6/12"
                              key={2 * index}
                              defaultValue={entry[0]}
                              onChange={handleHeaderInputs}
                              onFocus={handleInputFocus}
                            />
                            <Input
                              className="value m-1 w-6/12"
                              key={2 * index + 1}
                              defaultValue={entry[1]}
                              onChange={handleHeaderInputs}
                              onFocus={handleInputFocus}
                            />
                          </div>
                        )}
                      </>
                    ))}
                    <div className="flex w-full">
                      <Input
                        ref={lastKeyInput}
                        className="key last-key m-1 w-6/12"
                        key="200"
                        onChange={handleHeaderInputs}
                        onFocus={handleInputFocus}
                      />
                      <Input
                        ref={lastValueInput}
                        className="value last-value m-1 w-6/12"
                        key="201"
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

        <article className="flex sm:w-6/12 flex-col">
          <Card className="m-1 flex grow flex-col h-80">
            <CardHeader>
              <CardTitle>Response Section</CardTitle>
              <CardDescription>
                This is the section for response
              </CardDescription>
            </CardHeader>
            <CardContent className="flex grow flex-col overflow-x-hidden">
              <div className="flex grow flex-wrap overflow-x-hidden">
                {isLoading ? <GraphqlResponseSkeleton /> : <MonacoResponse />}
              </div>
            </CardContent>
            <CardFooter>
              {error.isError && <Error />}
            </CardFooter>
          </Card>

          {schema.isSchema && (
            <Card className="m-1 max-h-screen overflow-y-scroll flex grow flex-col h-80">
              <CardHeader>
                <CardTitle>Documentation Explorer</CardTitle>
                <CardDescription>is lazy-loaded</CardDescription>
              </CardHeader>
              <CardContent className="overflow-y-scroll">
                <Suspense fallback={<GraphqlResponseSkeleton />}>
                  <Doc01Welcome />
                </Suspense>
                <Suspense fallback={<GraphqlResponseSkeleton />}>
                  <Doc02Examples />
                </Suspense>
                {types
                  .filter((docUrl) => data.responseText.includes(docUrl))
                  .map((docUrl) => (
                    <Suspense>
                      <SomeDoc url={`types/${docUrl}`} />
                    </Suspense>
                  ))}
                {queries
                  .filter((docUrl) => data.responseText.includes(docUrl))
                  .map((docUrl) => (
                    <Suspense>
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

export default Editor;
