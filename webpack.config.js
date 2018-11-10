var webpack = require('webpack');
var path = require('path');


// dev_dir is used for storing development codes.
var DEV_DIR = path.resolve(__dirname, 'src');

// prod_dir is used for storing compiled production codes.
var PROD_DIR = path.resolve(__dirname, 'dist');


var config = {
  entry: DEV_DIR + '/index.js',
  output: {
    path: PROD_DIR,
    filename: 'graphql-sql.min.js',
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : DEV_DIR,
        loader : 'babel-loader'
      },
      {
        test:   /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;
