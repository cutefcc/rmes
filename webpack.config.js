const { resolve } = require("path");
const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = _mode === "production" ? true : false;
const WebpackBar = require("webpackbar");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { ProvidePlugin } = require('webpack');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const webpackBaseConfig = {
  entry: {
    main: resolve("src/web/index.tsx"),
  },
  output: {
    path: resolve(process.cwd(), "dist"),
  },
  cache: {
    type: "filesystem",
    // cacheDirectory: resolve(__dirname, '.temp'),
  },
  // performance: {
  //   maxAssetSize: 250000, // 最大资源大小250KB
  //   maxEntrypointSize: 250000, // 最大入口资源大小250KB
  //   hints: 'warning', // 超出限制时只给出警告
  // },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        // include: '/node_modules/',
        use: {
          loader: "swc-loader",
        },
      },
      //test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        include: [
          resolve(__dirname, "src"),
          resolve(__dirname, "node_modules"),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: "asset",
      },
      // {
      //   resourceQuery: /raw-lingui/,
      //   type: 'javascript/auto',
      // },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "all",
      maxAsyncRequests: 3,
      cacheGroups: {},
    },
  },
  resolve: {
    // fallback: { url: false, os: false },
    alias: {
      "@components": resolve("src/web/components"),
      "@hooks": resolve("src/web/hooks"),
      "@pages": resolve("src/web/pages"),
      "@layouts": resolve("src/web/layouts"),
      "@assets": resolve("src/web/assets"),
      "@store": resolve("src/web/store"),
      "@service": resolve("src/web/service"),
      "@utils": resolve("src/web/utils"),
      "@lib": resolve("src/web/lib"),
      "@constants": resolve("src/web/constants"),
    },
    extensions: [".js", ".ts", ".tsx", "jsx", ".css"],
  },
  plugins: [
    // new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      chunkFilename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      ignoreOrder: false,
    }),
    // new ProvidePlugin({
    //   Buffer: ['buffer', 'Buffer'],
    // }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new Dotenv(),
  ],
};
module.exports = merge.default(webpackBaseConfig, _mergeConfig);
