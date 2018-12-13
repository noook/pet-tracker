const path = require('path');

module.exports = {
  assetsDir: 'assets',
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        src: path.resolve(__dirname, '../src'),
      },
    },
  },
};
