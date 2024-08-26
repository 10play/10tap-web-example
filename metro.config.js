const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const webAliases = {
  "react-native": "react-native-web",
  "react-native-webview": "@10play/react-native-web-webview",
};
const fallbackResolutions = {
  "../Utilities/Platform": "react-native-web/dist/exports/Platform",
  "../Components/AccessibilityInfo/legacySendAccessibilityEvent":
    "react-native-web/dist/exports/AccessibilityInfo",
  "./PlatformColorValueTypes": "react-native-web/dist/exports/StyleSheet",
  "../../Utilities/Platform": "react-native-web/dist/exports/Platform",
  "../../../../Libraries/Utilities/Platform":
    "react-native-web/dist/exports/Platform",
  "./BaseViewConfig": "@10play/react-native-web-webview/shim",
  "./RCTAlertManager": "@10play/react-native-web-webview/shim",
  "./Platform": "react-native-web/dist/exports/Platform",
  "./RCTNetworking": "@10play/react-native-web-webview/shim",
  "../Utilities/BackHandler": "@10play/react-native-web-webview/shim",
  "../DevToolsSettings/DevToolsSettingsManager":
    "@10play/react-native-web-webview/shim",
  "../../Network/RCTNetworking": "@10play/react-native-web-webview/shim",
  "../../Image/Image": "@10play/react-native-web-webview/shim",
  "../../StyleSheet/PlatformColorValueTypes":
    "react-native-web/dist/exports/StyleSheet",
};

config.resolver.resolveRequest = (
  context,
  realModuleName,
  platform,
  moduleName
) => {
  try {
    if (platform === "web") {
      const alias = webAliases[realModuleName];
      if (alias) {
        return {
          filePath: require.resolve(alias),
          type: "sourceFile",
        };
      }
    }
    return context.resolveRequest(
      context,
      realModuleName,
      platform,
      moduleName
    );
  } catch (error) {
    const fallback = fallbackResolutions[realModuleName];
    if (fallback) {
      return {
        filePath: require.resolve(fallback),
        type: "sourceFile",
      };
    }
    throw error;
  }
};

module.exports = config;
