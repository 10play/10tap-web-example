import { Image, TouchableOpacity, View } from "react-native";
import {
  useBridgeState,
  DEFAULT_TOOLBAR_ITEMS,
  type EditorBridge,
} from "@10play/tentap-editor";

export const WebToolbar = ({ editor }: { editor: EditorBridge }) => {
  const editorState = useBridgeState(editor);
  const args: any = {
    editor,
    editorState,
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {DEFAULT_TOOLBAR_ITEMS.map(({ onPress, disabled, active, image }, i) => {
        return (
          <TouchableOpacity
            onPress={onPress(args)}
            disabled={disabled(args)}
            style={[editor.theme.toolbar.toolbarButton]}
            key={i}
          >
            <View
              style={[
                editor.theme.toolbar.iconWrapper,
                active(args)
                  ? editor.theme.toolbar.iconWrapperActive
                  : undefined,
                disabled(args)
                  ? editor.theme.toolbar.iconWrapperDisabled
                  : undefined,
              ]}
            >
              <Image
                source={image(args)}
                style={[
                  editor.theme.toolbar.icon,
                  active(args) ? editor.theme.toolbar.iconActive : undefined,
                  disabled(args)
                    ? editor.theme.toolbar.iconDisabled
                    : undefined,
                ]}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
