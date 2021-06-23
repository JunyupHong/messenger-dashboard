const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @use "@/assets/styles/base/_colors.scss" as color;
          @use "@/assets/styles/base/_fonts.scss" as font;
        `,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        openAnalyzer: true,
      }),
    ],
  },
};
