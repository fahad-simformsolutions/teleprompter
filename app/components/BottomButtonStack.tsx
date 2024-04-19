import * as React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Button, CustomButtonProps } from "./Button";

export function BottomButtonStack({
  buttons,
}: {
  buttons: CustomButtonProps[];
}) {
  return (
    <View style={styles.container}>
      {buttons.map((props) => (
        <Button
          key={props.label}
          buttonStyle={{ marginBottom: 10 }}
          {...props}
          fullWidth
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "auto",
    paddingVertical: 32,
  },
});
