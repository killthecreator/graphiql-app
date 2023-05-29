const abc =
  /^[\s1234567890abcdefghijklmnopqrstuvwxyz\-\?\(\)\{\}\$\[\]\"\:\;\&\\\/\.\,\%\!\@\#\^\*\=\+]+$/i;
const header =
  /^[\s1234567890abcdefghijklmnopqrstuvwxyz\-\$\&\.\%\!\#\^\*\+]+$/i;

export const valid = (x: string) => x.match(abc);
export const validHeader = (x: string) => x.match(header);
