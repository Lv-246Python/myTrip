var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry:   path.join(__dirname, 'myTrip/static/src/app.js'),
    output: {
        path: path.join(__dirname,'myTrip/static/public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.jsx?/,
            include: path.join(__dirname, 'myTrip/static/'),
            loader: 'babel-loader'
        },
        {
            test: /\.less$/,
            //ExtractPlugin needs to extract styles into separte file.
            use: ExtractTextPlugin.extract({
                //fallback uses to run style-loader when css is not extracted
                fallback: 'style-loader',
                //less-loader needs to bundle all .less files, css-loader needs to translate into css
                use: ['css-loader', 'less-loader']
      })
        }
        ]
    },
    plugins:[
        new ExtractTextPlugin({
            filename: 'index.css',
            disable: false,
            allChunks: true
        })
    ],
};

module.exports = config;
