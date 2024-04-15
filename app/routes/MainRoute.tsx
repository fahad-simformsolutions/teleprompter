import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/Home";
import { PrompterScreen } from "../screens/Prompter";
import type {RootStackParamList} from "./MainRouteTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MainRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Prompter" component={PrompterScreen} />
    </Stack.Navigator>
  );
}
