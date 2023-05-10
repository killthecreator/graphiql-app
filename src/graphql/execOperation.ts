import { Uri, editor } from 'monaco-editor';
import { fetcher } from '~/graphql/getSchema';
import * as JSONC from 'jsonc-parser';

export const execOperation = async function () {
  console.log('execOperation');
  const variables = editor.getModel(Uri.file('variables.json'))!.getValue();
  const operations = editor.getModel(Uri.file('operation.graphql'))!.getValue();
  const resultsModel = editor.getModel(Uri.file('results.json'));
  const result = await fetcher({
    query: operations,
    variables: JSON.stringify(JSONC.parse(variables)),
  });
  const data = await result.next();

  resultsModel?.setValue(JSON.stringify(data.value, null, 2));
};
