import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import Slider from "@react-native-community/slider";

import { SwitchWithLabel } from "../../components/SwitchWithLabel";
import { LabelWithValue } from "../../components/LabelWithValue";
import type { SettingsProps } from "../../routes/MainRouteTypes";
import { fontSizeKey, scrollingSpeedKey, textDirectionKey } from "../../constants/storageKeys";
import { getValue, setValue } from "../../utils/helpers";
import { Button } from "../../components/Button";
import { palette } from "../../theme/colors";
import { styles } from "./styles";

export function SettingsScreen({ navigation }: SettingsProps) {
  const [fontSize, setFontSize] = React.useState(28);
  const [scrollSpeed, setScrollSpeed] = React.useState(5);
  const [textDirection, setTextDirection] = React.useState('default');
  const [mirrorTextSwitch, setMirrorTextSwitch] = React.useState(false);
  const [manualMode, setManualMode] = React.useState(false);

  const handleCloseSettings = async () => {
    await setValue(fontSizeKey, fontSize.toString());
    await setValue(scrollingSpeedKey, scrollSpeed.toString());
    await setValue(textDirectionKey, textDirection);
    navigation.goBack();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const defaultFontSize = await getValue(fontSizeKey);
      if (defaultFontSize !== null) {
        setFontSize(parseInt(defaultFontSize as string, 10));
      }
      const defaultScrollingSpeed = await getValue(scrollingSpeedKey);
      if (defaultScrollingSpeed !== null) {
        setScrollSpeed(parseInt(defaultScrollingSpeed as string, 10));
      }
      const defaultTextDirection = await getValue(textDirectionKey);
      if (
        defaultTextDirection === "default" ||
        defaultTextDirection === "mirrored"
      ) {
        setTextDirection(defaultTextDirection);
        setMirrorTextSwitch(defaultTextDirection === "mirrored")
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.modalView}>
        <View style={styles.modalCard}>
          <View style={styles.settingsSection}>
            <LabelWithValue
              label="Font Size"
              value={fontSize.toString()}
            />
            <View style={styles.sliderView}>
              <Text style={{ fontSize: 10, marginRight: 10 }}>A</Text>
              <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={20}
                maximumValue={100}
                minimumTrackTintColor={palette.secondary}
                maximumTrackTintColor="#bdbdbd"
                onValueChange={(value) => setFontSize(value)}
                step={1}
                value={fontSize}
              />
              <Text style={{ fontSize: 25, marginLeft: 10 }}>A</Text>
            </View>
          </View>

          <View style={styles.settingsSection}>
            <LabelWithValue
              label="Scrolling Speed"
              value={scrollSpeed.toFixed(1)}
            />
            <View style={styles.sliderView}>
              <Text style={{ fontSize: 25, marginRight: 10 }}>🐢</Text>
              <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={1}
                maximumValue={10}
                minimumTrackTintColor={palette.secondary}
                maximumTrackTintColor="#bdbdbd"
                onValueChange={(value) => setScrollSpeed(value)}
                step={0.1}
                value={scrollSpeed}
              />
              <Text style={{ fontSize: 25, marginLeft: 10 }}>🐇</Text>
            </View>
          </View>
          <View style={styles.settingsSection}>
            <SwitchWithLabel
              label="Mirror Text"
              value={mirrorTextSwitch}
              onValueChange={(newValue) => {
                setMirrorTextSwitch(newValue)
                setTextDirection(newValue ? "mirrored" : "default")
              }}
            />
          </View>
          <View style={styles.settingsSection}>
            <SwitchWithLabel
              label="Manual Mode"
              value={manualMode}
              onValueChange={setManualMode}
            />
          </View>
        </View>

        <Button
          label="Save and Close"
          onPress={handleCloseSettings}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}
