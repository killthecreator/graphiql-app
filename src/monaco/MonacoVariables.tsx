import Editor, { type OnChange, type OnMount } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Uri, type editor } from "monaco-editor";
import {
  setVariables,
  setSchema,
  useAppDispatch,
  useAppSelector,
  setIsError,
} from "~/rtk";
import { type SchemaType, getSchema } from "~/graphql";
import { initializeMode } from "monaco-graphql/esm/initializeMode";
import { type IntrospectionQuery } from "graphql";
import { valid } from "~/validation";
import { Skeleton } from "~/components/ui";

window.MonacoEnvironment = {
  getWorker: (workerId, label) => {
    if (label === "json") {
      return new Worker(
        new URL(
          "monaco-editor/esm/vs/language/json/json.worker?worker",
          import.meta.url
        )
      );
    }
    return new Worker(
      new URL(
        "monaco-editor/esm/vs/editor/editor.worker?worker",
        import.meta.url
      )
    );
  },
};

export const MonacoVariables = () => {
  const variablesRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [loading, setLoading] = useState(false);

  const schema = useAppSelector((state) => state.schema);
  const theme = useAppSelector((state) => state.theme);
  const data = useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!schema.schema && !loading) {
      setLoading(true);
      getSchema()
        .then((data) => {
          if (!("data" in data)) {
            throw Error("there is no data in schema");
          }
          initializeMode({
            diagnosticSettings: {
              validateVariablesJSON: {
                [Uri.file("operation.graphql").toString()]: [
                  Uri.file("variables.json").toString(),
                ],
              },
              jsonDiagnosticSettings: {
                validate: true,
                schemaValidation: "error",
                // set these again, because we are entirely re-setting them here
                allowComments: true,
                trailingCommas: "ignore",
              },
            },
            schemas: [
              {
                introspectionJSON: data.data as unknown as IntrospectionQuery,
                uri: "myschema.graphql",
              },
            ],
          });

          dispatch(setSchema(data.data as SchemaType));

          return;
        })
        .then(() => setLoading(false));
    }
  }, [schema, loading, dispatch]);

  const handleEditorDidMount: OnMount = (editor) => {
    variablesRef.current = editor;
  };
  const handleEditorChange: OnChange = (value) => {
    if (value !== undefined && valid(value)) dispatch(setVariables(value));
    dispatch(setIsError(false));
  };

  return (
    <Editor
      height="10rem"
      defaultLanguage="graphql"
      loading={
        <div className="flex w-full flex-col items-start justify-start space-y-2">
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
      }
      language="graphql"
      theme={theme.isDay ? "light" : "vs-dark"}
      defaultValue={data.variables}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
      options={{
        smoothScrolling: true,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  );
};
