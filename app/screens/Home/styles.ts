import { StyleSheet } from "react-native";
import {palette} from "../../theme/colors"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.primary,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 24,
  },
  content: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    margin: 16
  },
  btn: {
    borderColor: "white",
    borderWidth: 1,
  },
  txt: {
    color: "white",
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  list: {
    flex: 1,
    alignSelf: 'stretch'
  }
});
