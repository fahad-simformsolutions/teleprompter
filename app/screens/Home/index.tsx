import * as React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";

import { type script, scripts } from "../../constants/sampleData";
import { ScriptCard } from "../../components/ScriptCard";
import { getUniqueId } from "../../utils/helpers";
import { styles } from "./styles";

export function HomeScreen() {
  const keyExtractor = (item: { id: string }) => item?.id ?? getUniqueId();
  const renderItem = ({ item }: { item: script }) => (
    <ScriptCard {...{ item }} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.content}>Guided Meditations</Text>
      <FlatList
        style={styles.list}
        data={scripts}
        {...{ keyExtractor, renderItem }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
