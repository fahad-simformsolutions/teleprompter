import * as React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { script } from "../constants/sampleData";
import type { PrompterProps } from "../routes/MainRouteTypes";
import { Divider } from "./Divider";
import { BottomRightSticker } from "./BottomRightSticker";
import { palette } from "../theme/colors";

type ScriptCardComponent = React.FC<{ item: script }>;

function getDurationLabel(duration: number): string {
  if (duration < 60) {
    return "~ 1 min"
  } else if (duration < 120) {
    return "1 min"
  } else {
    return `1 - ${Math.floor(duration / 60)} min`;
  }
}

export const ScriptCard: ScriptCardComponent = ({ item }: { item: script }) => {
  const { name, content, duration } = item;
  const navigation: PrompterProps["navigation"] = useNavigation();

  const onItemPress = () =>
    navigation.navigate("Prompter", {
      script: item,
    });
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed ? { backgroundColor: "#ffffff77" } : {},
      ]}
      onPress={onItemPress}
    >
      {({ pressed }) => (
        <>
          <View
            style={[
              styles.containerTitle,
              pressed ? { backgroundColor: "#ffffff77" } : {},
            ]}
          >
            <Text style={[styles.title, pressed ? { color: palette.white } : {}]}>
              {name}
            </Text>
          </View>
          <Divider />
          <View style={styles.containerContent}>
            <Text style={[styles.content, pressed ? { color: palette.white } : {}]}>
              {content.substring(0, 168)}...
            </Text>
          </View>
          <BottomRightSticker label={getDurationLabel(duration)} />
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: 168,
    alignSelf: "stretch",
    backgroundColor: palette.white,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#C1E1C1",
  },
  containerTitle: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    backgroundColor: palette.white,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  containerContent: {
    padding: 10,
    paddingTop: 0,
  },
  title: {
    color: palette.secondary,
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    color: "#a1a1a1",
    fontSize: 14,
    fontWeight: "400",
  },
});
