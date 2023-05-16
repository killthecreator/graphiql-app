/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
//import withImages from 'next-images';
import withTM from 'next-transpile-modules';
import { createRequire } from 'node:module';


import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
const withTMnew = withTM([
  'monaco-editor',
]);

const require = createRequire(import.meta.url);

const { i18n } = require('./next-i18next.config');

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config, options) => {
    config.output.publicPath = '/_next/';
    // because next.js doesn't like node_modules that import css files
    // this solves the issue for monaco-editor, which relies on importing css files
    //patchWebpackConfig(config, options);
    config.resolve.alias = {
      ...config.resolve.alias,

      // this solves a bug with more recent `monaco-editor` versions in next.js,
      // where vscode contains a version of `marked` with modules pre-transpiled, which seems to break the build.
      //
      // (the error mentions that exports.Lexer is a const that can't be re-declared)
      '../common/marked/marked.js': 'marked',
      
    };
    config.resolve.fallback = {fs: false};
    
    if (!options.isServer) {
      config.plugins.push(
        // if you find yourself needing to override
        // MonacoEnvironment.getWorkerUrl or MonacoEnvironment.getWorker,
        // you probably just need to tweak configuration here.
        new MonacoWebpackPlugin({
          // you can add other languages here as needed
          languages: ['json', 'graphql'],
          filename: 'static/[name].worker.js',
          // this is not in the plugin readme, but saves us having to override
          // MonacoEnvironment.getWorkerUrl or similar.
          customLanguages: [
            {
              label: 'graphql',
              worker: {
                id: 'graphql',
                entry: require.resolve('monaco-graphql/esm/graphql.worker.js'),
              },
            },
          ],
        }),
      );
    }
    // load monaco-editor provided ttf fonts
    config.module.rules.push({ test: /\.ttf$/, type: 'asset/resource' });
    return config;
  },
  reactStrictMode: true,
  i18n
  
};

export default withTMnew(config);
