import { StyleSheet } from "react-native";
import { palette } from "../../theme/colors";

export const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
  },
  modalCard: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    height: 40,
    backgroundColor: palette.secondary,
    marginHorizontal: 16,
    width: 'auto',
    alignSelf: 'stretch',
    borderWidth: 0,
  },
  buttonPressed: {
    backgroundColor: '#FFF',
    borderColor: palette.secondary,
    borderWidth: 1,
  },
  buttonSave: {
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonPressedText: {
    color: palette.secondary,
  },
  settingsText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 16
  },
  settingsSection: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 16
  },
  sliderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
