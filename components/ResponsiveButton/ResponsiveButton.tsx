import React, { useState } from "react";
import { Dimensions, StyleSheet, Pressable, ViewStyle } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import ResponsiveText from "@/components/ResponsiveText";
import calculateSize from "@/utils/CalculateSize";
import useDimensionsEffect from "@/hooks/useDimensions";
import { Constants } from "@/constants";
import fade from "@/animations/fade";

interface ResponsiveButtonProps {
  title: string;
  size: number;
  style?: ViewStyle | ViewStyle[];
  iconName?: string;
  minIconSize?: number;
  useAnimation?: boolean;
  handlePress: () => void;
}

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  title,
  size,
  style,
  iconName,
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
            style={{ color: "white", fontWeight: "bold" }}
          />
        )}

        {iconName !== undefined && (
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
