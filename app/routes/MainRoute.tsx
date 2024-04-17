import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/Home";
import { PrompterScreen } from "../screens/Prompter";
import { PlayerScreen } from "../screens/PlayRecording";
import { SettingsScreen } from "../screens/Settings";
import type {RootStackParamList} from "./MainRouteTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MainRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Prompter" component={PrompterScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
