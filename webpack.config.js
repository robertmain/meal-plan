const { resolve: _resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { sep } = require('path');

const {
  APP_NAME,
} = process.env;

const client = {
  src: {
    rootDir: _resolve(__dirname, 'src', 'client') + sep,
    app: _resolve(__dirname, 'src', 'client', 'app') + sep,
  },
  dist: {
    rootDir: _resolve(__dirname, 'dist'),
    app: _resolve(__dirname, 'dist', 'client'),
  },
};

module.exports = ({ mode = 'development' }) => ({
  target: 'web',
  mode,
  entry: {
    app: client.src.app + 'main.ts',
  },
  output: {
    path: client.dist.app,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    plugins: [
      new TSConfigPathsPlugin({
        configFile: client.src.rootDir + 'tsconfig.json',
      }),
    ],
  },
  context: client.src.rootDir,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: client.src.rootDir,
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
        test: /\.(png|ico|jpg)/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: client.src.app + 'assets/logo.png',
      title: APP_NAME,
    }),
    new VueLoaderPlugin(),
  ],
});
