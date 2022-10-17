const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const {dependencies: deps} = require("../package.json");
const path = require("./paths");

require('dotenv').config()

module.exports = {
  output: {
    publicPath: 'auto',
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
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
      name: 'qj_material',
      filename: 'remoteEntry.js',
      exposes: {
        './materials': path('src/react-components'),
        './menu': path('src/App'),
      },
      shared: {
        ...deps,
        "s-material-vue": {
          import: "s-material-vue",
          requiredVersion: require("../../s-material-vue/package.json").version,
        },
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
      template: path("src/index.html")
    })
  ],
};
