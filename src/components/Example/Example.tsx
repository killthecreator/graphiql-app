import { Editor } from "@monaco-editor/react";
import { useAppSelector } from "~/rtk";

export const Example = (props: { value: string }) => {
  const { theme } = useAppSelector((state) => state);
  return (
    <div className="editor-wrapper sm:w-6/12">
      <Editor
      height="100%"
      defaultLanguage="graphql"
      language="graphql"
      theme={theme.isDay ? "light" : "vs-dark"}
      value={props.value}
      options={{
        readOnly: true,
        smoothScrolling: true,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
      />
    </div>
  )
};
