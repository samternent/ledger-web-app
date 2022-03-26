const { merge } = require("webpack-merge");
const webpackBase = require("./webpack.base.config");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(webpackBase, {
  mode: "production",
  entry: "./src/main.js",
  devtool: 'source-map',
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
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ],
  },
});
