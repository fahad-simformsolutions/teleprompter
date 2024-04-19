import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Switch from "@splicer97/react-native-switch";
import { palette } from "../theme/colors";

type OnChangeMethod = (arg0: boolean) => void;

type SwitchComponent = {
  label: string;
  value: boolean;
  onValueChange: OnChangeMethod;
};

export function SwitchWithLabel({ label, value, onValueChange }: SwitchComponent) {
    const activeColor = palette.secondary;
    const circleStyle = styles.switchKnob;
    return (
    <View style={styles.container}>
      <Text style={styles.content}>{label}</Text>
      <Switch {...{ activeColor, circleStyle, value, onValueChange }} />
    </View>
  );
}

export function useSwitch({
  label,
  defaultValue,
  onChange,
}: {
  label: string;
  defaultValue: boolean;
  onChange: OnChangeMethod;
}) {
  const [value, setValue] = React.useState(defaultValue);
  const onValueChange = (newValue: boolean) => {
    setValue(newValue);
    onChange(newValue);
  };

  return [value, () => SwitchWithLabel({ label, value, onValueChange })] as [boolean, () => React.JSX.Element];
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  content: {
    color: palette.primary,
    fontSize: 18,
    fontWeight: "500",
  },
  switchKnob: {
    backgroundColor: palette.primary
  }
});
