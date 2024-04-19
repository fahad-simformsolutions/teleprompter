import { StyleSheet } from "react-native";
import { palette } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    paddingBottom: 10,
  },
  content: {
    color: palette.secondary,
    textAlign: 'center'
  },
  scrollView: {
    backgroundColor: palette.white,
    marginHorizontal: 16
  },
  scrollViewContent: {
    paddingBottom: 100
  },
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
  },
  buttonText: { color: palette.primary, fontSize: 20 },
  rightIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightIcon: {
    width: 22,
    height: 22,
    tintColor: palette.primary
  },
});
