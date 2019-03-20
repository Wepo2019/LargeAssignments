const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPreset = require("babel-preset-minify");
const MinifyPlugin = require("babel-minify-webpack-plugin");;

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'master.js',
        publicPath: '/'
    },
    mode: "development",
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'ChatIO', template: './index.html', inject: 'body' }),
        new MinifyPlugin({}, MinifyPreset)
    ],
    devServer: {
        open: true,
        compress: true,
        historyApiFallback: true,
        port: 3020
    },
    watch: true
};
