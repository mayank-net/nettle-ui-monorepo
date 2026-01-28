const path = require("path");
const DotEnv = require("dotenv");
const webpack = require("webpack");
const WebpackObfuscator = require("webpack-obfuscator");
const ESLintPlugin = require("eslint-webpack-plugin");

const BUILD_ENV = process.env.REACT_APP_BUILD_ENV || "development";

const localEnv =
  DotEnv.config({ path: path.resolve(__dirname, `../../.env.${BUILD_ENV}`) })
    .parsed || {};

const mergedEnv = { ...localEnv, ...process.env };

const envKeys = Object.keys(mergedEnv).reduce((prev, next) => {
  if (next.startsWith("REACT_APP_") || next === "NODE_ENV") {
    prev[`process.env.${next}`] = JSON.stringify(mergedEnv[next]);
  }
  return prev;
}, {} as { [key: string]: string });

const STATIC_BASE_URL = "/";

const config = {
  webpack: {
    configure: (webpackConfig: any) => {
      const oneOfRule = webpackConfig.module.rules.find(
        (rule: any) => rule.oneOf
      );

      webpackConfig.plugins.push(
        new ESLintPlugin({
          extensions: ["js", "jsx", "ts", "tsx"],
          failOnError: true,
          emitError: true,
          emitWarning: false,
          context: path.resolve(__dirname, "../"),
        })
      );

      if (oneOfRule) {
        oneOfRule.oneOf.forEach((loader: any) => {
          if (
            loader.options &&
            Object.prototype.hasOwnProperty.call(loader.options, "babelrc") &&
            Object.prototype.hasOwnProperty.call(loader, "include")
          ) {
            loader.include = [
              loader.include,
              path.resolve(__dirname, "../theme"),
              path.resolve(__dirname, "../shared"),
              path.resolve(__dirname, "../nettle-design"),
            ];
          }
        });
      }

      if (BUILD_ENV === "production" || BUILD_ENV === "staging") {
        webpackConfig.plugins.push(
          new WebpackObfuscator(
            {
              rotateStringArray: true,
              stringArrayThreshold: 0.75,
              deadCodeInjection: true,
              deadCodeInjectionThreshold: 0.4,
            },
            []
          )
        );

        webpackConfig.output.publicPath = STATIC_BASE_URL;

        const htmlPlugin = webpackConfig.plugins.find(
          (plugin: any) => plugin.constructor.name === "HtmlWebpackPlugin"
        );

        if (htmlPlugin) {
          htmlPlugin.userOptions.favicon = path.resolve(
            __dirname,
            "./public/favicon.ico"
          );
          htmlPlugin.userOptions.publicPath = STATIC_BASE_URL;
        }
      }

      return webpackConfig;
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
  },
};

export default config;
