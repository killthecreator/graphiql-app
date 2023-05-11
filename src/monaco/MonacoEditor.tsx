import Editor, { OnMount } from '@monaco-editor/react';
import { useRef } from 'react';

export const MonacoEditor = () => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  }

  return (<Editor
    height="90vh"
    defaultLanguage="graphql"
    defaultValue="// some comment"
    onMount={handleEditorDidMount}
  />);
}
