const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, join } = require("path");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin"); // 友好的打包输出
const notifier = require("node-notifier"); // 打包完窗口提示
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 检查包大小

const port = 3001;
module.exports = {
  devServer: {
    historyApiFallback: true,
    static: {
      directory: join(__dirname, "../dist"),
    },
    hot: true,
    open: true,
    port,
  },
  output: {
    publicPath: "/",
    filename: "scripts/[name].bundle.js",
    assetModuleFilename: "images/[name].[ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: "./public/favicon.ico",
      template: resolve(__dirname, "../src/index-dev.html"),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running here http://localhost:" + port],
        notes: ["💊 构建信息请及时关注窗口右上角"],
      },
      // new WebpackBuildNotifierPlugin({
      //   title: '💿 Solv Dvelopment Notification',
      //   logo,
      //   suppressSuccess: true,
      // }),
      onErrors: function (severity, errors) {
        if (severity !== "error") {
          return;
        }
        const error = errors[0];
        console.log(error);
        notifier.notify({
          title: "👒 Webpack Build Error",
          message: severity + ": " + error.name,
          subtitle: error.file || "",
          // icon: join(__dirname, "icon.png"),
        });
      },
      clearConsole: true,
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
