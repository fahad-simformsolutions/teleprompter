import React, { FC } from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { script } from "../constants/sampleData";
import type { PrompterProps } from "../routes/MainRouteTypes";
 
type ScriptCardComponent = FC<{item: script}>

export const ScriptCard: ScriptCardComponent = ({item}: { item: script }) => {
  const { name } = item;
  const navigation: PrompterProps['navigation'] = useNavigation();

  const onItemPress = () => navigation.navigate("Prompter", {
    script: item
  })
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed ? { backgroundColor: '#ffffff77' } : {},
      ]}
      onPress={onItemPress}
    >
      {({ pressed }) => <Text style={[styles.content, pressed ? {color: '#fff'} : {}]}>{name}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: 48,
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#a2a3a2",
    paddingHorizontal: 8,
  },
  content: {
    color: "#1e1a1e",
    fontSize: 14,
    fontWeight: "500",
  },
});
