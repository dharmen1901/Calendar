const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(less)$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./dist/index.html",
      filename: "./index.html"
    })
  ]
}