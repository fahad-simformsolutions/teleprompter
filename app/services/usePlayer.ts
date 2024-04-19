import * as React from "react";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import type { PlayBackType } from "react-native-audio-recorder-player";

interface PlayerState {
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

export type PlayerProps = {
  onStartPlaying?: () => void;
  onPausePlaying?: () => void;
  onResumePlaying?: () => void;
  onStopPlaying?: () => void;
  path?: string;
  progressBarWidth?: number;
  backwardSeekLength?: number;
  forwardSeekLength?: number;
};

const initialState = {
  recordSecs: 0,
  recordTime: "00:00:00",
  currentPositionSec: 0,
  currentDurationSec: 0,
  playTime: "00:00:00",
  duration: "00:00:00",
};

function playerStateReducer(
  state: PlayerState,
  { type, payload = {} }: { type: string; payload?: any }
) {
  switch (type) {
    case "UpdateTrackPosition":
      return { ...state, ...payload };
    case "BackwardSeek":
      return {
        ...state,
        currentPositionSec: state.currentPositionSec - payload * 1000,
      };
    case "ForwardSeek":
      return {
        ...state,
        currentPositionSec: state.currentPositionSec + payload * 1000,
      };
    case "ResetPlayerState":
      return initialState;
    default:
      return state;
  }
}

export function usePlayer(props: PlayerProps) {
  const {
    onStartPlaying,
    onPausePlaying,
    onResumePlaying,
    onStopPlaying,
    path,
    progressBarWidth = 128,
    backwardSeekLength = 10,
    forwardSeekLength = 30,
  } = props;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [playerState, dispatch] = React.useReducer(
    playerStateReducer,
    initialState
  );
  const { current: audioRecorderPlayer } = React.useRef<AudioRecorderPlayer>(
    new AudioRecorderPlayer()
  );
  const { currentPositionSec, currentDurationSec } = playerState;
  let progress = (currentPositionSec / currentDurationSec) * 100;
  let playWidth = (currentPositionSec / currentDurationSec) * progressBarWidth;

  audioRecorderPlayer.setSubscriptionDuration(0.1);

  const statusPress = (e: any): void => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);

    const currentPosition = Math.round(currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      audioRecorderPlayer.seekToPlayer(addSecs);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      audioRecorderPlayer.seekToPlayer(subSecs);
    }
  };

  const startPlaying = async (): Promise<void> => {
    try {
      await audioRecorderPlayer.startPlayer(path);
      setIsPlaying(true);
      await audioRecorderPlayer.setVolume(1.0);

      onStartPlaying?.();
      audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
        dispatch({
          type: "UpdateTrackPosition",
          payload: {
            currentPositionSec: e.currentPosition,
            currentDurationSec: e.duration,
            playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
            duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          },
        });
      });
    } catch (err) {
      console.log("startPlayer error", err);
    }
  };

  const pausePlaying = async (): Promise<void> => {
    await audioRecorderPlayer.pausePlayer();
    setIsPaused(true);
    onPausePlaying?.();
  };

  const resumePlaying = async (): Promise<void> => {
    await audioRecorderPlayer.resumePlayer();
    setIsPaused(false);
    onResumePlaying?.();
  };
  const backwardSeek = async (): Promise<void> => {
    await audioRecorderPlayer.seekToPlayer(currentPositionSec - backwardSeekLength * 1000);
    dispatch({ type: "BackwardSeek", payload: backwardSeekLength });
  };
  const forwardSeek = async (): Promise<void> => {
    await audioRecorderPlayer.seekToPlayer(currentPositionSec + forwardSeekLength * 1000);
    dispatch({ type: "ForwardSeek", payload: forwardSeekLength });
  };

  const stopPlaying = async (): Promise<void> => {
    setIsPlaying(false);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    dispatch({ type: "ResetPlayerState" });
    onStopPlaying?.();
  };

  return {
    isPlaying,
    isPaused,
    progress,
    playWidth,
    playerState,
    statusPress,
    startPlaying,
    pausePlaying,
    resumePlaying,
    stopPlaying,
    backwardSeek,
    forwardSeek,
    setVolume: audioRecorderPlayer.setVolume,
  };
}
