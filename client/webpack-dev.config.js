const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '..', '.env.server') });
const config = require('./webpack.config.js'); // Import your existing webpack config
const { createProxyMiddleware } = require('http-proxy-middleware');

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
    historyApiFallback: true, // This option is crucial for handling client-side routing
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use(
        '/graphql', // The endpoint you want to proxy
        createProxyMiddleware({
          target: 'http://localhost:3001/graphql', // Your Local GraphQL server address
          // target: `${ process.env.API_URL }/graphql`, // Your Remote GraphQL server address
          changeOrigin: true,
          pathRewrite: { '^/graphql': '' }
        })
      );
      return middlewares;
    },
  },
  optimization: {
    ...config.optimization,
    splitChunks: false, // Disable chunk splitting in dev
  },
};
