import { Editor } from "@monaco-editor/react";
import { useAppSelector } from "~/rtk";

export const Example = () => {
  const { data, theme } = useAppSelector((state) => state);
  return (
    <Editor
      height="10rem"
      defaultLanguage="graphql"
      language="graphql"
      theme={theme.isDay ? "light" : "vs-dark"}
      value={data.responseText}
      options={{
        readOnly: true,
        smoothScrolling: true,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  )
};
