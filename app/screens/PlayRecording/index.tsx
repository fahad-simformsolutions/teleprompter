import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { useRoute } from "@react-navigation/native";

import { icons } from "../../../assets";
import { PlayerProps } from "../../routes/MainRouteTypes";
import { IconButton } from "../../components/IconButton";
import { BottomButtonStack } from "../../components/BottomButtonStack";
import { palette } from "../../theme/colors";
import { styles } from "./styles";
import { usePlayer } from "../../services/usePlayer";

const screenWidth = Dimensions.get("screen").width;

export function PlayerScreen(props: PlayerProps) {
  const route = useRoute<PlayerProps["route"]>();
  const { path = "" } = route.params;
  const backwardSeekLength = 10;
  const forwardSeekLength = 30;
  const {
    isPlaying,
    isPaused,
    playWidth,
    playerState,
    startPlaying,
    pausePlaying,
    resumePlaying,
    stopPlaying,
    statusPress,
    backwardSeek,
    forwardSeek,
  } = usePlayer({
    progressBarWidth: screenWidth - 56,
    path,
    backwardSeekLength,
    forwardSeekLength,
  });
  const backSeekDisabled =
    playerState.currentPositionSec < backwardSeekLength * 1000;
  const aheadSeekDisabled =
    playerState.currentDurationSec - playerState.currentPositionSec <
    forwardSeekLength * 1000;
  
  const discardRecording = React.useCallback(
    () => props.navigation.goBack(),
    []
  );
  const saveRecording = React.useCallback(
    () => props.navigation.navigate("Home"),
    []
  );
  const buttons = [
    { label: "Discard", onPress: discardRecording },
    { label: "Save", onPress: saveRecording },
  ];

  React.useEffect(() => {
    //clean up task
    return () => {
      stopPlaying?.()
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleTxt}>Preview Recording</Text>
      <View style={styles.viewPlayer}>
        <TouchableOpacity style={styles.viewBarWrapper} onPress={statusPress}>
          <View style={styles.viewBar}>
            <View
              style={[
                styles.viewBarPlay,
                { width: Number.isNaN(playWidth) ? 0 : playWidth },
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.txtCounter}>
          {playerState.playTime} / {playerState.duration}
        </Text>
        <View style={styles.playBtnWrapper}>
          <IconButton
            icon={icons.backward}
            onPress={backwardSeek}
            disabled={backSeekDisabled}
          />
          {isPaused || !isPlaying ? (
            <IconButton
              icon={icons.play}
              onPress={isPaused ? resumePlaying : startPlaying}
            />
          ) : (
            <IconButton
              icon={icons.pause}
              onPress={pausePlaying}
            />
          )}
          <IconButton
            icon={icons.stop}
            onPress={stopPlaying}
          />
          <IconButton
            icon={icons.forward}
            onPress={forwardSeek}
            disabled={aheadSeekDisabled}
          />
        </View>
      </View>
      <BottomButtonStack buttons={buttons} />
    </SafeAreaView>
  );
}
