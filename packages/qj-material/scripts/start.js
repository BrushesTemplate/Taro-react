const dev = require('./dev');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require("./paths");

const defaultConfig = {
  devServer: {
    static: {
      directory: path('dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 3001,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        REACT_APP_BASE_URL: JSON.stringify(process.env.REACT_APP_BASE_URL),
        REACT_APP_SESSION_KEY: JSON.stringify(process.env.REACT_APP_SESSION_KEY),
        REACT_APP_APPLICATION: JSON.stringify(process.env.REACT_APP_APPLICATION),
      },
    }),
  ]
}
module.exports = () => {
  return merge(defaultConfig, dev);
}
