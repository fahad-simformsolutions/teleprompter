import AsyncStorage from "@react-native-async-storage/async-storage";

//date-time utils
const speeds = Object.freeze({
  slow: 100,
  paced: 150,
  average: 183,
  fast: 260,
});

/**
 * function timeToSpeak
 * Computes the duration in seconds to speak out the given content.
 * @param {string} content - the script for which to compute the duration.
 * @param {number} wordsPerMinute - the speed of speaking in words / minute. Defaults to 150
 * @returns {number} seconds - the duration to speak the content in seconds.
 */
export function timeToSpeak(
  content: string,
  wordsPerMinute: number = speeds.paced
): number {
  const contentWithoutPeriods = content?.split?.(".")?.join?.(" ");
  const words =
    contentWithoutPeriods?.split?.(" ")?.filter((x) => !!x?.trim()) ?? [];

  return Math.floor((60 / wordsPerMinute) * words.length);
}

/**
 * function getUniqueId
 * Generates unique Ids in the format: "jyc9wbxw-wdk52s"
 * @returns {string} a string id that can be uniquely identified.
 */
export function getUniqueId(): string {
  const prefix = Date.now().toString(36);
  const suffix = Math.random().toString(36).substring(2, 8);

  return `${prefix}-${suffix}`;
}

export const getValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {}
};

export const setValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {}
};
