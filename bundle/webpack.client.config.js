const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const config = {
    entry: {
        main: path.resolve(__dirname, '../src/client/index.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '..', 'dist/static'),
        publicPath: '/static/'
    },
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'sass-loader' 
                ]
            }, {
                test: /\.(js|jsx)$/,
                use: [
                    { loader: 'babel-loader' }
                ]
            }, {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, '..', 'dist')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all'
            }
          }
        },
        ...(process.env.NODE_ENV === 'production' && {minimize: true,
        minimizer: [new TerserPlugin()]})
    },
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, '..','dist'),
        proxy: {
            '!**/*.{js|css|hot-update.json}': {
                target: 'http://localhost:8000'
            }
        },
        hot: true,
        writeToDisk: true
    }
}

module.exports = config;