import { NavigationContainer } from "@react-navigation/native";
import { MainRoute } from "./app/routes/MainRoute";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MainRoute />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
