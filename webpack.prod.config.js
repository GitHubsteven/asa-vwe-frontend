const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let OptimizeCSSAssetPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    server: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',  //Notice how we use target: ‘web’ for the app builds. This is VERY important,
  // and you’ll get an error if you use target: ‘node’, so be sure to double check it.
  devtool: 'source-map', //webpack4 does not have a css minifier,although webpack5 will come with one.
  optimization: {
    minimizer: [new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true //set true if you  want js source maps
    }),
      new OptimizeCSSAssetPlugin({})],
  },
  // node: {
  //   // Need this when working with express, otherwise the build fails
  //   __dirname: false,   // if you don't put this is, __dirname
  //   __filename: false,  // and __filename return blank or /
  // },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        // Loads images into CSS and Javascript files
        test: /\.jpg$/,
        use: [{loader: "url-loader"}]
      },
      {
        // Loads CSS into a file when you import it via Javascript
        // Rules are set in MiniCssExtractPlugin
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      /**
       * Note that excludeChunks will exclude a file called server which we don’t want to be included into our HTML file, since that is the webserver, and not needed in the app itself.
       */
      excludeChunks: ['server']
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}