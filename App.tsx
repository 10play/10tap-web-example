import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";

const Editor = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  });

  if (Platform.OS === "web") {
    return (
      <SafeAreaView style={exampleStyles.fullScreen}>
        <View style={exampleStyles.toolbarRow}>
          <Toolbar editor={editor} />
        </View>
        <RichText editor={editor} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={exampleStyles.fullScreen}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={"padding"}
        style={exampleStyles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const App = () => (
  <SafeAreaProvider>
    <Editor />
  </SafeAreaProvider>
);

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  // The toolbar and link bar default to flex: 1, which would share the column
  // with the editor; in a row they only fill the width.
  toolbarRow: {
    flexDirection: "row",
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

const initialContent = `<p>This is a basic example!</p>`;

export default App;
