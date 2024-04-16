import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Prompter: undefined;
  Player: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type PrompterProps = NativeStackScreenProps<
  RootStackParamList,
  "Prompter"
>;
export type PlayerProps = NativeStackScreenProps<
  RootStackParamList,
  "Player"
>;
