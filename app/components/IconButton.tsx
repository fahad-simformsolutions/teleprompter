import * as React from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  GestureResponderEvent,
} from "react-native";
import { icons } from "../../assets";
import { palette } from "../theme/colors";

type IconButtonProps = {
  icon: typeof icons.settings;
  tintColor?: string;
  disabled?: boolean;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
};

export function IconButton({
  icon,
  onPress,
  tintColor = palette.secondary,
  disabled = false,
}: IconButtonProps) {
  const disabledTint = "#a1a3a1";
  return (
    <Pressable style={styles.iconButton} {...(disabled ? {} : { onPress })}>
      <Image
        source={icon}
        style={styles.icon}
        tintColor={disabled ? disabledTint : tintColor}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: palette.primary,
  },
});
