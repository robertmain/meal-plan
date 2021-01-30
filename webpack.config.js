const path = require('path');
const { IgnorePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * NestJs uses a custom wrapper around require() that allows it to show a
 * warning when some extra package needs to be installed. This causes problems
 * with webpack, so we're blacklisting packages we're not using with the
 * IgnorePlugin below.
 *
 * To de-blacklist a package, just remove it from this array.
 */
const nestBlacklist = [
  '^class-validator$',
  '^class-transformer$',
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

const resolve = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  plugins: [
    new TSConfigPathsPlugin(),
  ],
};

module.exports = ({ mode = 'development' }) => ({
  mode,
  entry: ['./src/main.ts'],
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  resolve,
  context: path.resolve(__dirname),
  target: 'node',
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
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
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
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: true,
      verbose: mode === 'development',
    }),
    new IgnorePlugin({
      contextRegExp: /@nestjs/,
      resourceRegExp: new RegExp(nestBlacklist.join('|')),
    }),
  ],
  node: {
    __dirname: false,
  },
});
