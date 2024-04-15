import { NavigationContainer } from "@react-navigation/native";
import { MainRoute } from "./app/routes/MainRoute";

export default function App() {
  return (
    <NavigationContainer>
      <MainRoute />
    </NavigationContainer>
  );
}
