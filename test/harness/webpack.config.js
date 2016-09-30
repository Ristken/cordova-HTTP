const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.join(__dirname, 'www_src', 'index.js'),
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'index.js'
    },
    bail: true,
    devtool: 'inline-source-map',
    loaders: [
        {
            test: /\.html$/,
            loader: 'html'
        }
    ],
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'www_src', 'index.html')
        })
    ]
};
