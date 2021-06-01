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
};
