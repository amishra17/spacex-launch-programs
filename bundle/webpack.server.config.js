const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    mode: process.env.NODE_ENV,
    entry: path.resolve(__dirname, '..', 'src/server/index.js'),
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    externals: [nodeExternals()],
    module: {
        rules: [
          {
            test: /\.js$/,
            use: 'babel-loader'
          },
          {
            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            use: [
                { loader: 'style-loader' },
                {
                    loader: 'css-loader',
                    options: {
                    modules: true
                    }
                },
                { loader: 'sass-loader' }
            ]
        }
        ]
    }
}