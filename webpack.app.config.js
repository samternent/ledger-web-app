const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base.config");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(webpackBase, {
  mode: "production",
  entry: "./src/main.js",
  plugins: [
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
});
