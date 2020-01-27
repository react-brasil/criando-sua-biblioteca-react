const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const APP_PATH = "./public";

const config = {
  mode: "development",
  entry: path.resolve(__dirname, APP_PATH),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    library: "default",
    libraryTarget: "umd"
  },

  resolve: { extensions: [".js", ".json"] },

  module: {
    rules: [
      { test: /\.(js)x?$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(APP_PATH, "index.html")
    })
  ]
};

module.exports = () => config;
