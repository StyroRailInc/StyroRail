// React imports
import { useEffect } from "react";
import { runOnJS, SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

// Constants
import { Constants } from "@/constants";

export const fadeInSlide = (
  offset: SharedValue<number>,
  scale: SharedValue<number>,
  opacity: SharedValue<number>,
  axis: "horizontal" | "vertical",
  setterValue?: any,
  setter?: (value: any) => void
) => {
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      axis === "horizontal" ? { translateX: offset.value } : { translateY: offset.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  useEffect(() => {
    offset.value = withTiming(Constants.NO_OFFSET, {
      duration: Constants.WALL_ROW_ANIMATION_DURATION_MS,
    });
    opacity.value = withTiming(
      Constants.FULL_OPACITY,
      {
        duration: Constants.WALL_ROW_ANIMATION_DURATION_MS,
      },
      () => {
        if (setter) {
          runOnJS(setter)(setterValue);
        }
      }
    );
  }, [offset, opacity, setterValue]);

  return animatedStyles;
};
