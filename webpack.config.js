var path = require("path");
var webpack = require("webpack");
var pkg = require("./package.json");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var name = "mauticgrapesbuilderbundle";
var env = process.env.WEBPACK_ENV;
var plugins = [];

if (env !== "dev") {
  plugins.push(new webpack.BannerPlugin(pkg.name + " - " + pkg.version));
}

module.exports = {
  // __dirname, doesnt work here -> need to find out why ( quickfix for now )
  entry: [path.resolve(path.dirname(__filename) + "/Assets/src/builder.js")],
  mode: "development",
  output: {
    path: path.resolve(path.dirname(__filename) + "/Assets/dist/js/"),
    filename: name + '.min.js',
    library: name,
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  // externals: { grapesjs: "grapesjs" },
  plugins: plugins
};
