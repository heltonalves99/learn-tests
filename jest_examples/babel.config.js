module.exports = (api) => {
  if (api) api.cache(true);
  const presets = [
    ["@babel/preset-env", {
      "useBuiltIns": false,
    }],
  ];
  const plugins = [
    ["@babel/plugin-transform-runtime"]
  ];
  return {
      presets,
      plugins,
  };
};
