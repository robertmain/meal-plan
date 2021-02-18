const { resolve: _resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { sep } = require('path');
const nodeExternals = require('webpack-node-externals');
const { IgnorePlugin } = require('webpack');

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
    app: _resolve(__dirname, 'dist', 'public'),
  },
};

const server = {
  src: {
    rootDir: _resolve(__dirname, 'src', 'server') + sep,
  },
  dist: {
    rootDir: _resolve(__dirname, 'dist'),
  },
};

/**
 * NestJs uses a custom wrapper around require() that allows it to show a
 * warning when some extra package needs to be installed. This causes problems
 * with webpack, so we're blacklisting packages we're not using with the
 * IgnorePlugin below.
 *
 * To de-blacklist a package, just remove it from this array.
 */
const nestBlacklist = [
  '^cache-manager$',
  '^@nestjs/microservices$',
  // packages below are required from microservices
  '^amqp-connection-manager$',
  '^amqplib$',
  '^grpc$',
  '^mqtt$',
  '^nats$',
  '^redis$',
];

module.exports = ({ mode = 'development' }) => ([
  {
    name: 'client',
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
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash].[ext]',
          },
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
  },
  {
    name: 'server',
    mode,
    target: 'node',
    entry: server.src.rootDir + 'main.ts',
    externals: [nodeExternals()],
    output: {
      path: server.dist.rootDir,
      filename: 'server.js',
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [
        new TSConfigPathsPlugin({
          configFile: './tsconfig.build.json',
        }),
      ],
    },
    context: server.src.rootDir,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.ts$/,
          include: server.src.rootDir,
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
      ],
    },
    plugins: [
      new IgnorePlugin({
        contextRegExp: /@nestjs/,
        resourceRegExp: new RegExp(nestBlacklist.join('|')),
      }),
    ],
  },
]);
