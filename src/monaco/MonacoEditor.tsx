import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Uri, editor, languages } from "monaco-editor";
import {
  setEditorText,
  setSchema,
  useAppDispatch,
  useAppSelector,
  setIsError,
} from "~/rtk";
import { getSchema } from "~/graphql";
import { initializeMode } from "monaco-graphql/esm/initializeMode";
import { IntrospectionQuery } from "graphql";
import { defaultOperations } from "~/consts";

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

export const MonacoEditor = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

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

          dispatch(setSchema(data.data));

          return;
        })
        .then(() => setLoading(false));
    }
  }, [schema, loading]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };
  const handleEditorChange: OnChange = (value) => {
    if (value !== undefined) dispatch(setEditorText(value));
    dispatch(setIsError(false));
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="graphql"
      language="graphql"
      theme={theme.isDay ? "light" : "vs-dark"}
      defaultValue={data.editorText}
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
