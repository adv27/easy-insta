const path = require('path');

module.exports = {
    entry: __dirname + '/src/scripts/content/instagram' + '/main.js',
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'src/dist/scripts/content/instagram')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
};