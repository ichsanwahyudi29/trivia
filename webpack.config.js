const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

console.log('modee', process.env.NODE_ENV);

const webpackConfig = {
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: './dist',
    port: 3333,
  },
  devtool: 'source-map',
  entry: {
    main: ['./src/assets/js/index.js', './src/assets/scss/style.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].min.js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img',
              limit: 8192,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].ext',
              outputPath: 'assets/font',
            },
          },
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].mp3',
              outputPath: 'assets/music',
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'audio:src'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/quiz.html',
      filename: 'quiz.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/complete.html',
      filename: 'complete.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/leaderboard.html',
      filename: 'leaderboard.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/general.html',
      filename: 'general.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/general_quiz.html',
      filename: 'general_quiz.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/general_complete.html',
      filename: 'general_complete.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/general_leaderboard.html',
      filename: 'general_leaderboard.html',
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].min.css' : '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};

module.exports = webpackConfig;
