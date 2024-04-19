import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { palette } from "../theme/colors";

export type CustomButtonProps = {
  label: string;
  fullWidth?: boolean;
  buttonStyle?: object;
  onPress: ((event: GestureResponderEvent) => void) | undefined | null;
};

export function Button({
  label,
  onPress,
  fullWidth,
  buttonStyle = {}
}: CustomButtonProps) {
  const buttonContainerStyle = StyleSheet.compose(
    [styles.button, buttonStyle],
    fullWidth ? styles.buttonFullWidth : {}
  );
  return (
    <Pressable
      style={({ pressed }) => [
        buttonContainerStyle,
        pressed ? styles.buttonPressed : {},
      ]}
      {...{ onPress }}
    >
      {({ pressed }) => (
        <Text
          style={[styles.buttonText, pressed ? styles.buttonPressedText : {}]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    height: 40,
    backgroundColor: palette.secondary,
    marginHorizontal: 16,
    borderWidth: 0,
  },
  buttonFullWidth: {
    width: "auto",
    alignSelf: "stretch",
  },
  buttonPressed: {
    backgroundColor: "#FFF",
    borderColor: palette.secondary,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonPressedText: {
    color: palette.secondary,
  },
});
