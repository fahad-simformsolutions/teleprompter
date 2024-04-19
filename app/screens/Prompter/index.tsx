import * as React from "react";
import {
  ScrollView,
  Text,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";

import { getValue } from "../../utils/helpers";
import {
  fontSizeKey,
  scrollingSpeedKey,
  textDirectionKey,
} from "../../constants/storageKeys";
import { Recorder } from "../../components/Recorder";
import type { PrompterProps } from "../../routes/MainRouteTypes";
import { styles } from "./styles";

let computedOffset = 0;

export const PrompterScreen: React.FC<PrompterProps> = ({
  navigation,
}: PrompterProps) => {
  const route = useRoute<PrompterProps["route"]>();
  const { name, content } = route.params.script;
  const refContainer = React.useRef<ScrollView>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const [fontSize, setFontSize] = React.useState(28);
  const [scrollSpeed, setScrollSpeed] = React.useState(15);
  const [textDirection, setTextDirection] = React.useState<"default" | "mirrored">(
    "default"
  );

  const onStartRecording = () => setIsScrolling(true);
  const onPauseRecording = () => setIsScrolling(false);
  const onResumeRecording = () => setIsScrolling(true);
  const onStopRecording = () => setIsScrolling(false);

  let {current: interval} = React.useRef<ReturnType<typeof setInterval>>();

  useFocusEffect(
    React.useCallback(() => {
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
        }
      };

      fetchData();
      computedOffset = 0;
      refContainer?.current?.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      });
    }, [])
  );

  const textStyle = (textDirection: "default" | "mirrored") => {
    return textDirection === "default"
      ? [styles.content, { fontSize }]
      : [styles.content, { fontSize, transform: [{ rotateY: "180deg" }] }];
  };

  const scroll = () => {
    computedOffset += (scrollSpeed);

    refContainer.current?.scrollTo({
      x: 0,
      y: computedOffset,
      animated: true,
    });
  };

  React.useEffect(() => {
    if (isScrolling) {
      interval = setInterval(scroll, 100);
    }

    return () => {
      clearInterval(interval);
    }
  }, [isScrolling]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
    });
  }, [navigation]);

  const handleManualScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    computedOffset = event.nativeEvent.contentOffset.y;
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={refContainer}
        onScrollEndDrag={handleManualScroll}
        scrollEventThrottle={scrollSpeed / 2}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={textStyle(textDirection)}>{content}</Text>
      </ScrollView>
      <Recorder
        {...{
          onStartRecording,
          onPauseRecording,
          onResumeRecording,
          onStopRecording,
        }}
      />
    </SafeAreaView>
  );
};
