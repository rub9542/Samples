const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [["@babel/plugin-proposal-class-properties"]],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      return babelLoaderOptions;
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#3B2D5B" },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
