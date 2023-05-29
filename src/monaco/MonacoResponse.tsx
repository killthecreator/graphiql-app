import Editor, { type OnMount } from "@monaco-editor/react";
import { useRef } from "react";
import { type editor } from "monaco-editor";
import { useAppSelector } from "~/rtk";
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

export const MonacoResponse = () => {
  const responseRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const data = useAppSelector((state) => state.data);
  const theme = useAppSelector((state) => state.theme);

  const handleEditorDidMount: OnMount = (editor) => {
    responseRef.current = editor;
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="graphql"
      loading={
        <Skeleton className="justify flex h-4 w-[250px] flex-col items-start" />
      }
      language="graphql"
      theme={theme.isDay ? "light" : "vs-dark"}
      value={data.responseText}
      onMount={handleEditorDidMount}
      options={{
        readOnly: true,
        smoothScrolling: true,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  );
};
