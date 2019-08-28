var path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "../css/style.css"
    // disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {
        app: [
            './src/styles/style.scss'
        ]
    },

    output: {
        path: __dirname + '../',
        filename: 'style.css'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: true,
                            minimize: true,
                            url: false
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })

            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 
                    'ignore-loader'
                    // 'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
                    // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false&name=assets/[name].ext'
                
            },
            {
                test:    /\.html$/,
                exclude: /node_modules/,
                loader:  'file-loader?name=[name].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
        ]
    },

    plugins: [
        extractSass
    ],

    devServer: {
        inline: true,
        contentBase: '../',
        stats: { colors: true }
    }
};
