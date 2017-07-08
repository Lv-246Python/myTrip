var webpack = require('webpack');
var path = require('path');

var config = {
    entry: './public/src/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'public/src'),
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

module.exports = config;