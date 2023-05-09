export const defaultOperations =
  localStorage.getItem('operations') ??
  `
# cmd/ctrl + return/enter will execute the op,
# same in variables editor below
# also available via context menu & f1 command palette

query($limit: Int!) {
    payloads(limit: $limit) {
        customer
    }
}
`;

export const defaultVariables =
  localStorage.getItem('variables') ??
  `
 {
     // limit will appear here as autocomplete,
     // and because the default value is 0, will
     // complete as such
     "limit": false
 }
`;
