const path = require('path');
const config = require('./webpack.config.js'); // Import your existing webpack config

module.exports = {
  ...config,
  mode: 'development',
  output: {
    filename: 'bundle.js', // Static filename for development
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Ensure this is set correctly
  },
  devServer: {
    compress: true, // Enable gzip compression
    port: 3000, // Port to run dev server on
    hot: true, // Enable hot module replacement,
    historyApiFallback: true // This option is crucial for handling client-side routing
  },
  optimization: {
    ...config.optimization,
    splitChunks: false, // Disable chunk splitting in dev
  },
};
