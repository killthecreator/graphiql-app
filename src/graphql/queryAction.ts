import { KeyMod } from "monaco-editor";
import { execOperation } from "~/graphql/execOperation";

export const queryAction = {
  id: 'graphql-run',
  label: 'Run Operation',
  contextMenuOrder: 0,
  contextMenuGroupId: 'graphql',
  keybindings: [
    // eslint-disable-next-line no-bitwise
    KeyMod.CtrlCmd
  ],
  run: execOperation,
};
