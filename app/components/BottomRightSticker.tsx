import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { palette } from "../theme/colors";

export function BottomRightSticker({ label }: { label: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 1,
    right: 0,
    backgroundColor: '#4434cb',
    width: 80,
    height: 28,
    borderBottomEndRadius: 4,
    borderTopStartRadius: 14,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    color: palette.white,
    fontSize: 12,
    fontWeight: '400'
  },
});
