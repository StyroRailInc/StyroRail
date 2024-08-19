// React imports
import React from "react";
import { ViewStyle } from "react-native";

// Type
import { InputState } from "@/screens/srf-drawer/types/inputState";

// Constants
import { Constants } from "@/constants";

// Components
import ResponsiveButton from "@/components/ResponsiveButton";

// Helper functions
import { rotateWall } from "./helpers";

interface ArrowsProps {
  inputState: InputState;
  style?: ViewStyle;
}

const LeftArrow: React.FC<ArrowsProps> = ({ inputState, style }) => {
  const handleLeftArrowPress = () => {
    rotateWall(inputState, "left");
  };

  return (
    <ResponsiveButton
      title={""}
      size={Constants.FONT_SIZE}
      style={style}
      iconName={"arrowleft"}
      minIconSize={Constants.MIN_ARROW_SIZE}
      handlePress={handleLeftArrowPress}
    />
  );
};

export default LeftArrow;
