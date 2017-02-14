const webpack = require('webpack');
let CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
module.exports = {
    entry: {
        index: './src/js/index.js',
        main: './src/js/main.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            excloude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warning: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,
            chunks: ['index', 'main']
        })
    ]
}