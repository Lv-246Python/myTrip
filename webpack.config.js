var webpack = require('webpack');
var path = require('path');

var config = {
    entry:   path.join(__dirname, 'myTrip/static/src/app.js'),
    output: {
        path: path.join(__dirname,'myTrip/static/public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.js/,
            include: path.join(__dirname, 'myTrip/static/'),
            loader: 'babel-loader'
        }
        ]
    },
};

module.exports = config;
