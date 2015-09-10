/*eslint-disable*/

var webpack = require('webpack');
var path = require('path');

module.exports = {
  target: 'node',
  cache: false,
  context: __dirname,
  debug: false,
  devtools: "source-map",
  entry:   ["./src/load-db.js"],

  output:  {
    path:     path.join(__dirname, "src"),
    filename: "load-db-webpack.js"
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    loaders: [
      {include: /\.js$/, loaders: ['babel-loader?stage=1&optional=runtime'],
        exclude: [/node_modules/]}
    ]
  },

  resolve: {
    extensions: ["", ".js"],
    modulesDirectories: [
      "node_modules"
    ]
  },

  resolveLoader: {
    modulesDirectories: ["node_modules"]
  },

  node:    {
    __dirname: true,
    fs:        'empty'
  }

}
