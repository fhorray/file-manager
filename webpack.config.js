// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'dosya.config': path.resolve(__dirname, 'dosya.config.ts'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  // ...
};
