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
  AppDispatch,
  RootState,
  setEditorText,
  setResponseText,
  setVariables,
  setIsSchema,
  useGraphqlMutation,
  useAppSelector,
  useAppDispatch,
  setHeaders,
  Headers
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
  FocusEventHandler
} from "react";

import GraphqlResponseSkeleton from "~/components/ui/graphqlResponseSkeleton";
import {
  Doc01Welcome,
  Doc02Examples,
  Doc03GetAbility,
  SomeDoc,
} from "~/components/Documentation";

import { Monaco } from '~/components/Monaco';

const queries = [
  "getAbility",
  "getAllPokemon",
  "getFuzzyAbility",
  "getFuzzyItem",
  "getFuzzyLearnset",
  "getFuzzyMove",
  "getFuzzyPokemon",
  "getItem",
  "getLearnset",
  "getMove",
  "getPokemon",
  "getPokemonByDexNumber",
  "getTypeMatchup",
];
const types = [
  "Abilities",
  "AbilitiesEnum",
  "Ability",
  "Boolean",
  "CatchRate",
  "EvYields",
  "Flavor",
  "Float",
  "Gender",
  "GenerationalPokemonLearnset",
  "Int",
  "IsNonStandard",
  "Item",
  "ItemsEnum",
  "Learnset",
  "LearnsetLevelUpMove",
  "LearnsetMove",
  "Move",
  "MovesEnum",
  "Pokemon",
  "PokemonEnum",
  "PokemonLearnset",
  "PokemonType",
  "Query",
  "Stats",
  "String",
  "TypeEffectiveness",
  "TypeMatchup",
  "TypesEnum",
];


const Editor: NextPage = () => {
  const [graphql, response] = useGraphqlMutation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data);
  const schema = useAppSelector((state) => state.schema);

  const headersAccordion = useRef<HTMLDivElement>(null);
  const lastKeyInput = useRef<HTMLInputElement>(null);
  const lastValueInput = useRef<HTMLInputElement>(null);

  const [focused, setFocused] = useState<HTMLInputElement | null>(null);
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    const keyInputs = headersAccordion.current?.querySelectorAll('.key') as NodeListOf<HTMLInputElement>;
    const valueInputs = headersAccordion.current?.querySelectorAll('.value') as NodeListOf<HTMLInputElement>;
    if (focused === lastKeyInput.current && focused !== null && keyInputs.length > 1) {
      focused.value = '';
      const inputToFocus = Array.from(keyInputs).at(-2) as HTMLInputElement;
      inputToFocus.focus();
      setFocused(inputToFocus);
    }

    if (focused === lastValueInput.current && focused !== null && valueInputs.length > 1) {
      focused.value = '';
      const inputToFocus = Array.from(valueInputs).at(-2) as HTMLInputElement;
      inputToFocus.focus();
      setFocused(inputToFocus);
    }
  }, [changed]);

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsLoading(true);
    const headersWithoutEmpty: Headers = {};
    Object.keys(data.headers).forEach(key => {
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
      })
      .catch((error) => {
        const stringified = JSON.stringify(error.data, null, 4);
        dispatch(setResponseText(stringified));
        dispatch(setIsSchema(false));
      })
      .finally(() => setIsLoading(false));
  };

  const handleTextareaInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const inp = e.target as HTMLInputElement;
    const val = inp.value;
    dispatch(setEditorText(val));
  };

  const handleVariablesInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const inp = e.target as HTMLInputElement;
    const val = inp.value;
    dispatch(setVariables(val));
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(e.target);
    if (e.target.value === null) e.target.value = '';
    headersSetting();
  }

  const handleHeaderInputs: ChangeEventHandler<HTMLInputElement> = (e) => {
    headersSetting();
    setChanged(!changed);
  }

  const headersSetting = () => {
    const keyInputs = headersAccordion.current?.querySelectorAll('.key') as NodeListOf<HTMLInputElement>;
    const valueInputs = headersAccordion.current?.querySelectorAll('.value') as NodeListOf<HTMLInputElement>;

    let newHeaders: Headers = {};
    keyInputs.forEach((keyInput: HTMLInputElement, i: number) => {
      const key = keyInput.value as keyof typeof newHeaders;
      const val = valueInputs[i]?.value as string;
      newHeaders[key] = val;
    })
    dispatch(setHeaders(newHeaders));
  }

  return (
    <>
      <Head>
        <title>Editor</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex w-full h-full grow">
        <article className="flex w-6/12 flex-col">
          <Card className="m-1 flex grow flex-col">
            <CardHeader>
              <CardTitle>Request Editor</CardTitle>
              <CardDescription>Wite your Grqphql request</CardDescription>
            </CardHeader>
            <CardContent className="flex grow flex-col">
              <Monaco />
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
                    <Textarea
                      onInput={handleVariablesInput}
                      defaultValue={data.variables}
                    />
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
                  <AccordionContent className="p-1 flex w-full" ref={headersAccordion}>
                    {Object.entries(data.headers).map((entrie, index) =>
                      <>
                      {(entrie[0] !== '' || entrie[1] !=='') &&
                      <div className="w-full flex">
                        <Input className="key m-1 w-6/12" key={2 * index} defaultValue={entrie[0]} onChange={handleHeaderInputs} onFocus={handleInputFocus}/>
                        <Input className="value m-1 w-6/12" key={2 * index + 1} defaultValue={entrie[1]} onChange={handleHeaderInputs} onFocus={handleInputFocus}/>
                      </div>}
                      </>
                    )}
                    <div className="w-full flex">
                      <Input ref={lastKeyInput} className="key last-key m-1 w-6/12" key="200" onChange={handleHeaderInputs} onFocus={handleInputFocus}/>
                      <Input ref={lastValueInput} className="value last-value m-1 w-6/12" key="201" onChange={handleHeaderInputs} onFocus={handleInputFocus}/>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </article>

        <article className="flex w-6/12 flex-col">
          <Card className="m-1 grow">
            <CardHeader>
              <CardTitle>Response Section</CardTitle>
              <CardDescription>
                This is the section for response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap">
                {isLoading ? (
                  <GraphqlResponseSkeleton />
                ) : (
                  <ScrollArea className="min-h-20 max-h-screen">
                    {data.responseText}
                  </ScrollArea>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <p></p>
            </CardFooter>
          </Card>

          {schema.isSchema && <Card className="m-1 max-h-screen overflow-y-scroll">
            <CardHeader>
              <CardTitle>Documentation Explorer</CardTitle>
              <CardDescription>is lazy-loaded</CardDescription>
            </CardHeader>
            <CardContent className="overflow-y-scroll">
              <Suspense fallback={<div>Loading...</div>}>
                <Doc01Welcome />
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <Doc02Examples />
              </Suspense>
              {types
              .filter(docUrl => data.responseText.includes(docUrl))
              .map(docUrl => (
                <Suspense>
                  <SomeDoc url={`types/${docUrl}`}/>
                </Suspense>
              ))}
              {queries
              .filter(docUrl => data.responseText.includes(docUrl))
              .map(docUrl => (
                <Suspense>
                  <SomeDoc url={`queries/${docUrl}`}/>
                </Suspense>
              ))}
            </CardContent>
            <CardFooter>
              <p>Card Footer if needed</p>
            </CardFooter>
          </Card>}
        </article>
      </section>
    </>
  );
};

export default Editor;
