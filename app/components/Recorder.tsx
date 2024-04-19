import * as React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { icons } from "../../assets";
import { PlayerProps, SettingsProps } from "../routes/MainRouteTypes";
import { useRecorder } from "../services/useRecorder";
import type { RecorderProps } from "../services/useRecorder";
import { palette } from "../theme/colors";
import { IconButton } from "./IconButton";

const { width: WINDOW_WIDTH } = Dimensions.get("window");


export function Recorder(props: RecorderProps) {
  const navigation: SettingsProps["navigation"] | PlayerProps["navigation"] =
    useNavigation();
  const {
    isRecording,
    isRecordingPaused,
    recorderState,
    path,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
  } = useRecorder(props);
  const goToSettings = () =>
    (navigation as SettingsProps["navigation"]).navigate("Settings");
  const stopAndPreview = () => {
    stopRecording?.();
    (navigation as PlayerProps["navigation"]).navigate("Player", { path });
  };

  React.useEffect(() => {
    //cleanup on unmount
    return () => {
      if (isRecording) {
        stopRecording?.();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {isRecording ? (
        <>
          <View style={styles.leftView}>
            {isRecordingPaused ? (
              <IconButton icon={icons.record} onPress={resumeRecording} />
            ) : (
              <IconButton icon={icons.pause} onPress={pauseRecording} />
            )}
            <IconButton icon={icons.stop} onPress={stopAndPreview} />
          </View>
          <Text style={styles.duration}>{recorderState.recordTime}</Text>
        </>
      ) : (
        <>
          <View style={styles.leftView}>
            <IconButton icon={icons.record} onPress={startRecording} />
          </View>
          <IconButton icon={icons.settings} onPress={goToSettings} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.primary,
    height: 56,
    width: WINDOW_WIDTH - 32,
    position: "absolute",
    bottom: 24,
    marginHorizontal: 16,
    borderRadius: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    elevation: 2,
    shadowColor: "#1e1a1e",
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 2, height: 2 },
  },
  leftView: {
    flexDirection: "row",
  },
  duration: {
    color: palette.secondary,
    fontSize: 18,
    marginEnd: 16,
  },
});
