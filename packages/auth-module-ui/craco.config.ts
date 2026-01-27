const path = require("path");
const DotEnv = require("dotenv");
const webpack = require("webpack");
const WebpackObfuscator = require("webpack-obfuscator");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const BUILD_ENV = process.env.REACT_APP_BUILD_ENV || "development";
const env = DotEnv.config({ path: `../../.env.${BUILD_ENV}` }).parsed;

// collect all .env keys and values
const envKeys = Object.keys(env).reduce((prev, next) => {
  // first we search for each key inside of .env.local, because of precedence
  prev[`process.env.${next.trim()}`] = JSON.stringify(env[next].trim());
  return prev;
}, {} as { [key: string]: string });

const STATIC_BASE_URL = `https://${process.env.REACT_APP_STATIC_BUILD_BUCKET}.s3.ap-south-1.amazonaws.com/dist/build-auth/`;

const config = {
  webpack: {
    configure: (webpackConfig: any) => {
      const oneOfRule = webpackConfig.module.rules.find(
        (rule: any) => rule.oneOf
      );

      // ES Lint for unused vars
      new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
        failOnError: true,
        emitError: true,
        emitWarning: false,
        context: path.resolve(__dirname, "../"), // or wherever the app root is
      });

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

      // Conditionally add obfuscation plugin for production builds
      if (BUILD_ENV === "production" || BUILD_ENV === "staging") {
        webpackConfig.plugins.push(
          new WebpackObfuscator(
            {
              rotateStringArray: true, // Obfuscation options
              stringArrayThreshold: 0.75,
              deadCodeInjection: true,
              deadCodeInjectionThreshold: 0.4,
            },
            []
          )
        );

        webpackConfig.output.publicPath = STATIC_BASE_URL;

        // Modify existing HtmlWebpackPlugin configuration
        const htmlPlugin = webpackConfig.plugins.find(
          (plugin: any) => plugin.constructor.name === "HtmlWebpackPlugin"
        );

        if (htmlPlugin) {
          htmlPlugin.userOptions.favicon = path.resolve(
            __dirname,
            "./public/favicon.ico"
          );
          htmlPlugin.userOptions.publicPath = STATIC_BASE_URL;
        } else {
          // Add HtmlWebpackPlugin if not already present
          webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
              template: path.resolve(__dirname, "./public/index.html"),
              favicon: path.resolve(__dirname, "./public/favicon.ico"),
              inject: true,
              publicPath: STATIC_BASE_URL,
            })
          );
        }
      }

      return webpackConfig;
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
  },
};

export default config;
