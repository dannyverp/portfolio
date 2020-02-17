const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',//change to 'development' for non minified js
  output: {
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            // CSS to CommonJS (resolves CSS imports into exported CSS strings)
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
              // url: false,
              // import: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  cssnext: {},
                  cssnano: {},
                  autoprefixer: {}
                }
              },
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: './fonts'

            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: '[name].svg',
          outputPath: 'images',
          publicPath: './images'
        }
      },
      {
        test: /\.(gif|png|jpe?g|ico|mp4)$/i,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
          publicPath: './images'
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        inject: true,
        hash: true,
        filename: './index.html',
        template: './src/index.ejs'
      }
    ),
    new HtmlWebpackTagsPlugin({
        append: true
      }
    ),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'index.css',
      chunkFilename: 'index.css',
    }),
  ],
}