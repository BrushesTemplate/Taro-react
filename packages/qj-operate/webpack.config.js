const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require('webpack');
require('dotenv').config()
const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:3002/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3002,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'qj_operate',
      filename: 'remoteEntry.js',
      exposes: {
        './operate': './src/App',
      },
      // remotes: {
      //   'qj-operate-vue': 'qj_operate_vue@http://localhost:3004/remoteEntry.js'
      // },
      shared: {
        ...deps,
        "qj-shared-library": {
          import: "@brushes/qj-shared-library",
          requiredVersion: deps["@brushes/qj-shared-library"],
        },
        "react": {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        }
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        REACT_APP_BASE_URL: JSON.stringify(process.env.REACT_APP_BASE_URL),
        REACT_APP_SESSION_KEY: JSON.stringify(process.env.REACT_APP_SESSION_KEY),
        REACT_APP_APPLICATION: JSON.stringify(process.env.REACT_APP_APPLICATION),
      },
    }),
  ],
};
