module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "@babel/plugin-transform-export-namespace-from",
      //THIS NEEDS TO BE LISTED LAST: https://www.reanimated2.com/docs/fundamentals/getting-started#:~:text=Why%20do%20I-,need,-this%3F
      "react-native-reanimated/plugin",
    ],
  };
};
