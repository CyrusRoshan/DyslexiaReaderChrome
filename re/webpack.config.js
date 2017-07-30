module.exports = {
  context: __dirname + "/lib/js/src",
  entry: {
    "Model": "./model.js",
    "Drc_inject": "./drc_inject.js",
    "Ocr": "./ocr.js",
    "Browser_dim": "./browser_dim.js"
  },
  output: {
    library: "[name]",
    path: __dirname + "/dist",
    filename: "[name].js"
  }
};
