import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Prompter: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type PrompterProps = NativeStackScreenProps<
  RootStackParamList,
  "Prompter"
>;
