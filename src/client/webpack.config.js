const { resolve: _resolve, sep } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootElementPlugin = require('html-webpack-root-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { DefinePlugin } = require('webpack');

const paths = {
  src: {
    rootDir: _resolve(__dirname) + sep,
    app: _resolve(__dirname, 'app') + sep,
  },
  dist: {
    rootDir: _resolve(__dirname, '..', '..', 'dist'),
    app: _resolve(__dirname, '..', '..', 'dist', 'public'),
  },
};

/**
 * Client webpack build configuration.
 *
 * This webpack config produces a bundle for the client-side application only.
 *
 * @param {object} webpackEnv Webpack env object (basically any/all options passed in via the CLI)
 * @param {object} processEnv Process env object (environment variables from process.env)
 */
const config = ({ mode = 'none' }, { APP_NAME = '', BASE_URL = '/' } = {}) => ({
  name: 'client',
  target: 'web',
  mode,
  entry: {
    app: paths.src.app + 'main.ts',
  },
  output: {
    path: paths.dist.app,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    plugins: [
      new TSConfigPathsPlugin({
        configFile: paths.src.rootDir + 'tsconfig.json',
      }),
    ],
  },
  context: paths.src.rootDir,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.src.rootDir,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash].[ext]',
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: paths.src.app + 'assets/logo.png',
      title: APP_NAME,
      meta: {
        viewport: 'width=device-width, initial-scale=1, user-scalable=no shrink-to-fit=no',
      },
    }),
    new HtmlWebpackRootElementPlugin('app'),
    new VueLoaderPlugin(),
    new DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(BASE_URL),
    }),
  ],
});

module.exports = {
  config,
  paths,
};
