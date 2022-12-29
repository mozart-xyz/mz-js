const path = require("path");

module.exports = (env, argv) => {
  return {
    entry: {
      index: path.resolve(__dirname, "./dist/esm/src/index.js")
    },
    output: {
      path: path.resolve(__dirname, "./dist/umd"), // builds to ./dist/umd/
      filename: "index.js", // index.js
      library: "Mozart", // aka window.myLibrary
      libraryTarget: "umd", // supports commonjs, amd and web browsers
      globalObject: "this"
    },
    module: {
      rules: [{ test: /\.t|js$/, use: "babel-loader" }]
    }
  };
};
