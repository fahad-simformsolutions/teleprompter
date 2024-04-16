import React from "react";
import { View, Text } from "react-native";

import Button from "../../components/Button";
import { styles } from "./styles";
import type { HomeProps } from "../../routes/MainRouteTypes";

export function HomeScreen({navigation}: HomeProps) {
  const onButtonPress = () => navigation.navigate("Player")
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Home</Text>
      <Button style={styles.btn} textStyle={styles.txt} onPress={onButtonPress}>Play Recordings</Button>
    </View>
  );
}