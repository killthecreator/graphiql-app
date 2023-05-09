/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
//import withImages from 'next-images';
import withTM from 'next-transpile-modules';
const withTMnew = withTM([
  'monaco-editor',
]);

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
};

export default withTMnew(config);
