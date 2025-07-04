const { join, resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // js压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // css压缩
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:5].bundle.js',
    assetModuleFilename: 'images/[name].[contenthash:5][ext]',
  },
  experiments: {
    outputModule: true,
  },
  performance: {
    maxAssetSize: 250000, // 最大资源大小250KB
    maxEntrypointSize: 250000, // 最大入口资源大小250KB
    hints: 'warning', // 超出限制时只给出警告
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  // external: {
  //   'react': 'React',
  //   'react-dom': 'ReactDom',
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: './public/favicon.ico',
      template: resolve(__dirname, '../src/index-prod.html'),
    }),
    // new WorkboxPlugin.GenerateSW({
    //   swDest: 'sw.js',
    //   clientsClaim: true, // Service Worker 激活后立即控制页面
    //   skipWaiting: true, // 跳过等待，直接激活新的 Service Worker
    //   // 预缓存的匹配规则（默认缓存所有 Webpack 输出的文件）
    //   include: [/\.html$/, /\.js$/, /\.css$/],
    //   // 可选：添加运行时缓存策略
    //   runtimeCaching: [
    //     {
    //       urlPattern: /\.(?:png|jpg|jpeg|svg)$/, // 匹配图片资源
    //       handler: 'CacheFirst', // 使用“缓存优先”策略
    //       options: {
    //         cacheName: 'images', // 缓存名称
    //         expiration: {
    //           maxEntries: 10, // 最多缓存 10 个文件
    //           maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存 30 天
    //         },
    //       },
    //     },
    //     {
    //       // API 请求缓存策略
    //       urlPattern: /^https:\/\/api\./,
    //       handler: 'NetworkFirst',
    //       options: {
    //         cacheName: 'api-cache',
    //         networkTimeoutSeconds: 3,
    //         expiration: {
    //           maxEntries: 50,
    //           maxAgeSeconds: 5 * 60, // 5 分钟
    //         },
    //       },
    //     },
    //   ],
    // }),
  ],
};
