const webpack = require('webpack');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //生成独立css文件
const { ThemedProgressPlugin } = require('themed-progress-plugin'); // 进度条

const mode = argv.mode || 'development';
const modeflag = mode === 'production' ? true : false;

const mergeConfig = require(`./configs/webpack.${mode}.js`);
const webpackBaseConfig = {
  mode,
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 同步导入
      filename: modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      // 异步导入
      chunkFilename: modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      ignoreOrder: false,
    }),
    new ThemedProgressPlugin(),
    new webpack.DefinePlugin({
      __NODE_ENV__: JSON.stringify(mode),
      __API_URL__: JSON.stringify(modeflag ? '' : 'http://localhost:8081'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src/'),
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('src/pages'),
      '@layouts': resolve('src/layouts'),
      '@assets': resolve('src/assets'),
      '@states': resolve('src/states'),
      '@service': resolve('src/service'),
      '@utils': resolve('src/utils'),
      '@lib': resolve('src/lib'),
      '@constants': resolve('src/constants'),
      '@connections': resolve('src/connections'),
      '@abis': resolve('src/abis'),
      '@mTypes': resolve('src/mTypes'),
      '@routes': resolve('src/routes'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
    fallback: {
      // stream: require.resolve('stream-browserify'),
    },
  },
};

module.exports = merge.default(webpackBaseConfig, mergeConfig);
