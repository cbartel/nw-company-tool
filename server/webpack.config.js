const path = require('path');

module.exports = function (options) {
  return {
    ...options,
    entry: {
      main: './src/main.ts',
      server: './src/server.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    devtool: 'source-map',
  };
};
