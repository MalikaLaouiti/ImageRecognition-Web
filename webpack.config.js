// webpack.config.js
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: './script/ImageAi.js', // Entry point for main bundle
    secondary: './script/Analyse.js' // Entry point for secondary bundle
  },
  output: {
    filename: '[name].bundle.js', // Use entry point name for output files
    path: path.resolve(__dirname, 'dist') // Output directory
  },
  plugins: [
    new Dotenv() // This will automatically read your .env file
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel loader
          options: {
            presets: ['@babel/preset-env'] // Use preset-env for modern JavaScript
          }
        }
      }
    ]
  },
  mode: 'development', // Set mode to development
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000, // Port for the dev server
    open: true, // Open browser after server had been started
    devMiddleware: {
      writeToDisk: true, // Ensure files are written to disk
    },
    watchFiles: {
      paths: ['*.html'],
      options: {
        usePolling: false,
      },
    },
  }
};
