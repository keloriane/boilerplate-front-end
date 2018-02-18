const path = require('path');
var webpack = require('webpack');
const imagePath = "./images";
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "app.css",
    disable: process.env.NODE_ENV === "development"
});
const browserSync = new BrowserSyncPlugin({
        files: [
            './assets/js/*',
            './assets/scss/*',
            './public/*.html',
        ],
        server: {
            baseDir: 'public',
            index: "public/index.html"
        }
});


module.exports = {
    entry: './assets/js/app.js',
    output: {path: path.resolve(__dirname, 'public'), filename: 'app.js'},
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{loader: "css-loader"}, {loader: "sass-loader"}], fallback: "style-loader"
            })
        },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {name: imagePath + '/[name].[ext]'}
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: 'jquery'
        }),
        extractSass,browserSync
    ]
};
