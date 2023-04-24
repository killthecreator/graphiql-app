/** @type {import("prettier").Config} */
export default {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  endOfLine: "auto",
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,
  arrowParens: "always",
};
