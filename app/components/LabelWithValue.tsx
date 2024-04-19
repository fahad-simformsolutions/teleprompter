import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { palette } from "../theme/colors";


type LabelComponent = {
  label: string;
  value: string;
};

export function LabelWithValue({ label, value }: LabelComponent) {

    return (
    <View style={styles.container}>
      <Text style={styles.content}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
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
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: palette.secondary
  }
});
