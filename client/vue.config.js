const path = require('path');

module.exports = {
  assetsDir: 'assets',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/_variables.scss";
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        src: path.resolve(__dirname, '../src'),
      },
    },
  },
};
