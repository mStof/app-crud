module.exports = function (api) {
  api.cache(true);
  let plugins =  [] // <-- add this
;

  plugins.push('react-native-reanimated/plugin');

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
