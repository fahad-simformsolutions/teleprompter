import * as React from "react";
import { Platform, PermissionsAndroid } from "react-native";
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from "react-native-audio-recorder-player";
import type {
  AudioSet,
  RecordBackType,
} from "react-native-audio-recorder-player";

interface RecorderState {
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
}

export type RecorderProps = {
  onStartRecording?: () => void;
  onPauseRecording?: () => void;
  onResumeRecording?: () => void;
  onStopRecording?: () => void;
  audioSet?: AudioSet;
};

const initialState = {
  recordSecs: 0,
  recordTime: "00:00",
  currentPositionSec: 0,
  currentDurationSec: 0,
};

const defaultAudioSet: AudioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
  OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
};

function recorderStateReducer(
  state: RecorderState,
  { type, payload = {} }: { type: string; payload?: any }
) {
  switch (type) {
    case "UpdateRecordingTime":
      return { ...state, ...payload };
    case "ResetSeconds":
      return { ...state, recordSecs: 0 };
    default:
      return state;
  }
}

export function useRecorder(props: RecorderProps) {
  const {
    onStartRecording,
    onPauseRecording,
    onResumeRecording,
    onStopRecording,
    audioSet,
  } = props;
  const [isRecording, setIsRecording] = React.useState(false);
  const [isRecordingPaused, setIsRecordingPaused] = React.useState(false);
  let { current: audioRecorderPlayer } = React.useRef<
    AudioRecorderPlayer | undefined
  >(new AudioRecorderPlayer());
  const [recorderState, dispatch] = React.useReducer(
    recorderStateReducer,
    initialState
  );

  let path = Platform.select({
    ios: undefined,
    android: undefined,
  });

  audioRecorderPlayer?.setSubscriptionDuration(0.1);

  const startRecording = async (): Promise<void> => {
    if (Platform.OS === "android") {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          grants["android.permission.WRITE_EXTERNAL_STORAGE"] !==
            PermissionsAndroid.RESULTS.GRANTED ||
          grants["android.permission.READ_EXTERNAL_STORAGE"] !==
            PermissionsAndroid.RESULTS.GRANTED ||
          grants["android.permission.RECORD_AUDIO"] !==
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("All required permissions not granted!");
          return;
        }
      } catch (err) {
        console.warn(err);

        return;
      }
    }

    const uri = await audioRecorderPlayer?.startRecorder(
      path,
      audioSet ?? defaultAudioSet
    );

    setIsRecording(true);
    onStartRecording?.();

    audioRecorderPlayer?.addRecordBackListener((e: RecordBackType) => {
      dispatch({
        type: "UpdateRecordingTime",
        payload: {
          recordSecs: e.currentPosition,
          recordTime: audioRecorderPlayer?.mmss(
            Math.floor(e.currentPosition / 1000)
          ),
        },
      });
    });
  };

  const pauseRecording = async (): Promise<void> => {
    try {
      await audioRecorderPlayer?.pauseRecorder();
      setIsRecordingPaused(true);
      onPauseRecording?.();
    } catch (err) {
      console.log("Error while trying to pause recording: ", err);
    }
  };

  const resumeRecording = async (): Promise<void> => {
    await audioRecorderPlayer?.resumeRecorder();
    setIsRecordingPaused(false);
    onResumeRecording?.();
  };

  const stopRecording = async (): Promise<void> => {
    await audioRecorderPlayer?.stopRecorder();
    audioRecorderPlayer?.removeRecordBackListener();
    dispatch({ type: "ResetSeconds" });
    setIsRecordingPaused(false);
    setIsRecording(false);
    onStopRecording?.();
  };

  return {
    isRecording,
    isRecordingPaused,
    recorderState,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    path,
  };
}
