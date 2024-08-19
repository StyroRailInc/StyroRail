// React imports
import { useEffect } from "react";
import { withTiming, Easing, SharedValue } from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";

// Constants
import { Constants } from "@/constants";

const fade = (initialOpacity: SharedValue<number>, finalOpacity: number) => {
  useEffect(() => {
    initialOpacity.value = withTiming(finalOpacity, {
      duration: Constants.FADE_IN_DURATION_MS,
      easing: Easing.inOut(Easing.ease),
    });
  }, [initialOpacity]);

  return useAnimatedStyle(() => {
    return {
      opacity: initialOpacity.value,
    };
  });
};

export default fade;
