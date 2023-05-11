import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { Uri, editor, languages } from 'monaco-editor';
import { setEditorText, useAppDispatch } from '~/rtk';
import { getSchema, defaultOperations } from '~/graphql';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { IntrospectionQuery } from 'graphql';

window.MonacoEnvironment = {
  getWorker: (workerId, label) => {
    if (label === 'json') {
      return new Worker(new URL('monaco-editor/esm/vs/language/json/json.worker?worker', import.meta.url));
    }
    return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker?worker', import.meta.url));
  }
};

export const MonacoEditor = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [schema, setSchema] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!schema && !loading) {
      setLoading(true);
      getSchema()
        .then((data) => {
          console.log('this is schema');
          console.log(data);
          if (!('data' in data)) {
            throw Error(
              'there is no data in schema'
            );
          }
          initializeMode({
            diagnosticSettings: {
              validateVariablesJSON: {
                [Uri.file('operation.graphql').toString()]: [
                  Uri.file('variables.json').toString(),
                ],
              },
              jsonDiagnosticSettings: {
                validate: true,
                schemaValidation: 'error',
                // set these again, because we are entirely re-setting them here
                allowComments: true,
                trailingCommas: 'ignore',
              },
            },
            schemas: [
              {
                introspectionJSON: data.data as unknown as IntrospectionQuery,
                uri: 'myschema.graphql',
              },
            ],
          });

          setSchema(data.data);

          return;
        })
        .then(() => setLoading(false));
    }
  }, [schema, loading]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  }


  /*const handleEditorChange: FormEventHandler<HTMLDivElement> = (e) => {
    const inp = e.target as HTMLInputElement;
    const val = inp.value;
    dispatch(setEditorText(val));
  };*/

  const handleEditorChange: OnChange = (value) => {
    console.log('here is the current model value:', value);
    if (value !== undefined) dispatch(setEditorText(value));
  }

  return (<Editor
    height="100%"
    defaultLanguage="graphql"
    language="graphql"
    defaultValue={defaultOperations}
    onMount={handleEditorDidMount}
    onChange={handleEditorChange}
  />);
}
