import { type NextPage } from "next";

import Head from "next/head";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui";

import { ScrollArea } from "~/components/ui";

import { Textarea } from "~/components/ui";

import { Button } from "~/components/ui";
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
} from "~/rtk";
import {
  ChangeEvent,
  FormEventHandler,
  MouseEventHandler,
  Suspense,
  useState,
} from "react";

import GraphqlResponseSkeleton from "~/components/ui/graphqlResponseSkeleton";
import {
  Doc01Welcome,
  Doc02Examples,
  Doc03GetAbility,
  SomeDoc,
} from "~/components/Documentation";

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

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsLoading(true);
    const resp = graphql({
      query: data.editorText,
      variables: data.variables,
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

  return (
    <>
      <Head>
        <title>Editor</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex w-full grow">
        <article className="flex w-6/12 flex-col">
          <Card className="m-1 flex  flex-col">
            <CardHeader>
              <CardTitle>Request Editor</CardTitle>
              <CardDescription>Wite your Grqphql request</CardDescription>
            </CardHeader>
            <CardContent className="flex grow flex-col">
              <Textarea
                className="grow"
                onInput={handleTextareaInput}
                defaultValue={data.editorText}
              />
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
                  <AccordionContent className="p-1">
                    <Textarea />
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
              <p className="flex flex-wrap">
                {isLoading ? (
                  <GraphqlResponseSkeleton />
                ) : (
                  <ScrollArea className="min-h-20 max-h-screen">
                    {data.responseText}
                  </ScrollArea>
                )}
              </p>
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
