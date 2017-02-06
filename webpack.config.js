const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const  ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = {
    devtool: 'inline-source-map',
    entry: __dirname + '/app/client.js',
    output:{
        path: "./public/",
        publicPath: "",
        filename: "/js/bundle.js"
    },
    module:{
        loaders:[{
            test:/\.jsx?$/,
            exclude:/node_modules/,
            loader: "babel",
            query:{
                presets:["es2015","react"]
                }
        },

        {
      test: /\.eot/,
      loader: 'url-loader?mimetype=application/vnd.ms-fontobject'
      }, {
        test: /\.ttf/,
        loader: 'url-loader?mimetype=application/x-font-ttf'
      }, {
        test: /\.woff/,
        loader: 'url-loader?mimetype=application/font-woff'
      }, {
        test: /\.woff2/,
        loader: 'url-loader?mimetype=application/font-woff2'
      },{
        test: /\.svg/,
        loader: 'url-loader?mimetype=image/svg+xml'
      },
        {
            test: /\.css$/, // Only .css files
            loader: ExtractTextPlugin.extract(
                'style-loader',
                'css-loader'
                )
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
        ]
    },
    plugins:[
        new ExtractTextPlugin("/css/styles.css")
    ],
    devServer:{
        contentBase:"./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        port: 8001
    },
}
if(process.env.NODE_ENV === 'production'){
    config.devtool = false;
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ]
};
module.exports = config;
