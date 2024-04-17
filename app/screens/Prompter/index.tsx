import React, { useRef, useState, useEffect, FC } from "react";
import {
  ScrollView,
  Text,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
  Image
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { getValue } from "../../utils/helpers";
import {
  fontSizeKey,
  scrollingSpeedKey,
  textDirectionKey,
} from "../../constants/storageKeys";
import { styles } from "./styles";
import type { PrompterProps } from "../../routes/MainRouteTypes";
import { icons } from "../../../assets";

export const PrompterScreen: FC<PrompterProps> = ({navigation}: PrompterProps) => {
  const route = useRoute<PrompterProps["route"]>();
  const { content } = route.params.script;
  const refContainer = useRef<ScrollView>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const [fontSize, setFontSize] = useState(28);
  const [scrollSpeed, setScrollSpeed] = useState(15);
  const [textDirection, setTextDirection] = useState<"default" | "mirrored">(
    "default"
  );

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const onSettingsPressed = () => navigation.navigate("Settings")

    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.rightIconContainer} onPress={onSettingsPressed}>
          <Image style={styles.rightIcon} source={icons.settings} resizeMode="contain" />
        </Pressable>
      )
    })
  }, [navigation])

  const textStyle = (textDirection: "default" | "mirrored") => {
    return textDirection === "default"
      ? [styles.content, { fontSize }]
      : [styles.content, { fontSize, transform: [{ rotateY: "180deg" }] }];
  };

  let scrollOffset = 0;

  const scroll = () => {
    refContainer.current?.scrollTo({
      x: 0,
      y: scrollOffset + scrollSpeed,
      animated: true,
    });
  };

  useEffect(() => {
    if (isScrolling) {
      const interval = setInterval(() => {
        scroll();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isScrolling]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset = event.nativeEvent.contentOffset.y;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={refContainer}
        onScroll={handleScroll}
        scrollEventThrottle={scrollSpeed / 2}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Text style={textStyle(textDirection)}>{content}</Text>
      </ScrollView>
      <Pressable
        style={styles.button}
        onPress={() => setIsScrolling(!isScrolling)}
      >
        {({ pressed }) => (
          <Text style={[styles.buttonText, pressed ? { opacity: 0.5 } : {}]}>
            {isScrolling ? "Pause" : "Play"}
          </Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};
