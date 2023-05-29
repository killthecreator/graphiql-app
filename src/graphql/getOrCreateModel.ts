import { Uri, editor } from "monaco-editor";

export const getOrCreateModel = (uri: string, value: string) => {
  return (
    editor.getModel(Uri.file(uri)) ??
    editor.createModel(value, uri.split(".").pop(), Uri.file(uri))
  );
};
