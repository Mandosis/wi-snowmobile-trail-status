const webpack = require('webpack')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const path = require('path')

function root (args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [__dirname].concat(args))
}

module.exports = {
  context: __dirname,
  target: 'web',
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015' }
    ]
  },
  entry: {
    main: root('src/main.js')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    path: root('dist')
  },
  plugins: [
    new UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false,
      sourceMap: true
    })
  ],
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
}
