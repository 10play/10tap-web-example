const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.alias = {
    ...config.resolve.alias,
    "react-native": "react-native-web",
    "react-native-webview": "@10play/react-native-web-webview",
    crypto: "expo-crypto",
  };

  config.resolve.fallback = {
    ...config.resolve.fallback,
    "react-native/Libraries/Utilities/codegenNativeComponent":
      "@10play/react-native-web-webview/shim",
  };

  return config;
};
