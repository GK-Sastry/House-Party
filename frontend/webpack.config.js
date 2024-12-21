const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", //  The babel-loader is used to transpile modern JavaScript (e.g., ES6+)
          //  into a version of JavaScript that can run in older browsers.
        },
      },
    ],
  },
  optimization: {
    minimize: true, // What it does: This tells Webpack to minimize (compress) the output bundle.
    //   It reduces file size by removing unnecessary whitespace and shortening variable names.
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};

// Summary:
// Entry: Starts bundling from ./src/index.js.
// Output: Saves the bundled files in static/frontend with the name pattern [name].js.
// Loaders: Uses Babel to transpile modern JavaScript (but skips node_modules).
// Optimization: Minifies the output for smaller file size.
// Plugins: Sets NODE_ENV to "production" for better optimizations in libraries.
