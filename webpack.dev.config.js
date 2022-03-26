const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base.config");

module.exports = merge(webpackBase, {
  mode: "development",
  entry: "./src/main.js",
  output: {
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
});
