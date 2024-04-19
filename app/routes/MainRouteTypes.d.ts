import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import type { script } from "../constants/sampleData";

export type RootStackParamList = {
  Home: undefined;
  Prompter: { script: script };
  Player: { path?: string };
  Settings: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type SettingsProps = NativeStackScreenProps<RootStackParamList, "Settings">;
export type PrompterProps = NativeStackScreenProps<
  RootStackParamList,
  "Prompter"
>;
export type PlayerProps = NativeStackScreenProps<RootStackParamList, "Player">;
