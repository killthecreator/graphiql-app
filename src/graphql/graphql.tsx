import { defaultVariables, defaultOperations } from '~/graphql/default';
import { IntrospectionQuery } from 'graphql';
import { Uri, editor, languages } from 'monaco-editor';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { debounce } from '~/graphql/debounce';
import { queryAction } from '~/graphql/queryAction';
import { getSchema } from '~/graphql/getSchema';
import { getOrCreateModel } from './getOrCreateModel';
import { createEditor } from './createEditor';
import { setEditorText, useAppDispatch } from '~/rtk';

// set these early on so that initial variables with comments don't flash an error
languages.json.jsonDefaults.setDiagnosticsOptions({
  allowComments: true,
  trailingCommas: 'ignore',
});

export function Monaco() {
  const opsRef = useRef(null);
  const varsRef = useRef(null);
  const resultsRef = useRef(null);
  const [queryEditor, setQueryEditor] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [variablesEditor, setVariablesEditor] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [resultsViewer, setResultsViewer] =
    useState<editor.IStandaloneCodeEditor | null>(null);
  const [schema, setSchema] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  /**
   * Create the models & editors
   */
  useEffect(() => {
    const queryModel = getOrCreateModel('operation.graphql', defaultOperations);
    const variablesModel = getOrCreateModel('variables.json', defaultVariables);
    const resultsModel = getOrCreateModel('results.json', '{}');

    queryEditor ??
      setQueryEditor(
        createEditor(opsRef, {
          theme: 'vs-dark',
          model: queryModel,
          language: 'graphql',
        })
      );
    variablesEditor ??
      setVariablesEditor(
        createEditor(varsRef, {
          theme: 'vs-dark',
          model: variablesModel,
        })
      );
    resultsViewer ??
      setResultsViewer(
        createEditor(resultsRef, {
          theme: 'vs-dark',
          model: resultsModel,
          readOnly: true,
          smoothScrolling: true,
        })
      );

    queryModel.onDidChangeContent(
      debounce(300, () => {
        localStorage.setItem('operations', queryModel.getValue());
      })
    );
    variablesModel.onDidChangeContent(
      debounce(300, () => {
        localStorage.setItem('variables', variablesModel.getValue());
      })
    );

    // only run once on mount
  }, []);

  useEffect(() => {
    queryEditor?.addAction(queryAction);
    variablesEditor?.addAction(queryAction);
  }, [variablesEditor]);
  /**
   * Handle the initial schema load
   */
  useEffect(() => {
    if (!schema && !loading) {
      setLoading(true);
      getSchema()
        .then((data) => {
          if (!('data' in data)) {
            throw Error(
              'this demo does not support subscriptions or http multipart yet'
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

  const handleEditorChange: FormEventHandler<HTMLDivElement> = (e) => {
    const inp = e.target as HTMLInputElement;
    const val = inp.value;
    dispatch(setEditorText(val));
  };

  return (
    <div id="wrapper">
      <div id="left-pane" className="pane">
        <div ref={opsRef} className="editor" onChange={handleEditorChange}/>
        <div ref={varsRef} className="editor" />
      </div>
      <div id="right-pane" className="pane">
        <div ref={resultsRef} className="editor" />
      </div>
    </div>
  );
}
