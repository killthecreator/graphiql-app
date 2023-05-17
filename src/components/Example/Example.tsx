import { Editor } from "@monaco-editor/react";
import { useAppSelector } from "~/rtk";

export const Example = (props: { value: string }) => {
  const { theme } = useAppSelector((state) => state);
  return (
    <div className="editor-wrapper relative min-h-[190px]">
      <Editor
        className="top-20 h-full w-full sm:absolute sm:max-h-[190px]"
        defaultLanguage="graphql"
        language="graphql"
        theme={theme.isDay ? "light" : "vs-dark"}
        value={props.value}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
            handleMouseWheel: false,
          },
        }}
      />
    </div>
  );
};
