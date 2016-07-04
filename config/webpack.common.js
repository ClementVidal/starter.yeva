var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer');

var helpers = require('./helpers');
var config = require('./config');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            // Load typescript files
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            // This map to html files used from angular components
            {
                test: /\.component\.html$/,
                loader: 'to-string!html?attrs=""'
            },
            // This map to html files used directly, i.e: not from angular components
            {
                test: /\.html$/,
                exclude: /\.component\.html$/,
                loader: 'html?attrs=""'
            },
            // This map to scss files used from angular components
            {
                test: /\.component\.scss$/,
                loader: "to-string!css?-url!postcss-loader!sass"
            },            
            // This map to scss files used directly, i.e: not from angular components
            {
                test: /\.scss$/,
                exclude: /\.component\.scss$/,
                loader: "style!css?-url!postcss-loader!sass"
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    sassLoader: {
        includePaths: [helpers.root("./node_modules/foundation-sites/scss"), helpers.root("./src")]
    },
    htmlLoader: {
        minimize: false // workaround for ng2
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            title: config.title,
            description: config.description,
            publicPath: config.publicPath,
            template: './src/index.ejs',
            chunksSortMode: 'dependency'
        }),
        new CleanWebpackPlugin(['public/bundle'], {
            root: helpers.root('.'),
            verbose: true, 
            dry: false
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};