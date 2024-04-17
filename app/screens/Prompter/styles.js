import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  content: {
    color: "#0095a8",
    textAlign: 'center'
  },
  scrollView: {
    backgroundColor: "#fff",
    marginHorizontal: 16
  },
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 10,
  },
  buttonText: { color: "#0095a8", fontSize: 20 },
  rightIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rightIcon: {
    width: 22,
    height: 22,
    tintColor: '#0095a8'
  },
});
