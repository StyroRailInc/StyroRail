// React imports
import React, { useState } from "react";
import { Dimensions, StyleSheet, Pressable, ViewStyle, TextStyle } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Components
import ResponsiveText from "@/components/ResponsiveText";

// Cutom hooks
import calculateSize from "@/utils/CalculateSize";
import useDimensionsEffect from "@/hooks/useDimensions";

// Constants
import { Constants } from "@/constants";

// Animation
import fade from "@/animations/fade";

interface ResponsiveButtonProps {
  title: string;
  size: number;
  style?: ViewStyle | ViewStyle[];
  iconName?: string;
  textStyle?: TextStyle;
  minIconSize?: number;
  useAnimation?: boolean;
  handlePress: () => void;
}

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  title,
  size,
  style,
  iconName,
  textStyle,
  minIconSize = 0,
  useAnimation = false,
  handlePress,
}) => {
  const adjustedIconSize: number = calculateSize(Dimensions.get("window").width, size);

  const [iconSize, setIconSize] = useState<number>(Math.max(adjustedIconSize, minIconSize));

  const opacity = useSharedValue(Constants.NO_OPACITY);
  const animatedStyle = useAnimation ? fade(opacity, Constants.FULL_OPACITY) : {};

  useDimensionsEffect(size, [
    [setIconSize, (width, size) => calculateSize(width, size), minIconSize],
  ]);

  const handlePressWrapper = (event: any) => {
    event.preventDefault();
    handlePress();
  };

  return (
    <Animated.View style={[styles.animatedContainer, animatedStyle]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          style,
          { opacity: pressed ? Constants.HALF_OPACITY : Constants.FULL_OPACITY },
        ]}
        onPress={handlePressWrapper}
      >
        {iconName === undefined && (
          <ResponsiveText
            title={title}
            size={size}
            style={textStyle ? textStyle : { color: "white", fontWeight: "bold" }}
          />
        )}

        {iconName && (
          <AntDesign
            name={iconName}
            size={iconSize > Constants.MAX_IMAGE_SIZE ? Constants.MAX_IMAGE_SIZE : iconSize}
            color="white"
          />
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    width: "100%",
    alignItems: "center",
    userSelect: "none",
  },
  button: {
    backgroundColor: "#00aaef",
    borderRadius: 25,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  },
});

export default ResponsiveButton;
