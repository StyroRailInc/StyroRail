// React imports
import React, { useState } from "react";
import { Pressable, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Utility functions
import useDimensionsEffect from "@/hooks/useDimensions";
import calculateSize from "@/utils/CalculateSize";

//Constants
import { Constants } from "@/constants";

interface CheckBoxProps {
  size: number;
  isSelected: boolean;
  handlePress: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ size, isSelected, handlePress }) => {
  const [isCheckMarkVisible, setIsCheckMarkVisible] = useState<boolean>(isSelected);

  const [checkMarkSize, setCheckMarkSize] = useState<number>(
    calculateSize(Dimensions.get("window").width, size)
  );

  useDimensionsEffect(size, [
    [setCheckMarkSize, (width, size) => calculateSize(width, size), Constants.MIN_CHECKMARK_SIZE],
  ]);

  const adjustedCheckMarkSize = Math.min(
    Math.max(checkMarkSize, Constants.MIN_CHECKMARK_SIZE),
    Constants.MAX_CHECKMARK_SIZE
  );

  return (
    <Pressable
      style={[
        styles.box,
        {
          height: adjustedCheckMarkSize + Constants.CHECKBOX_PADDING,
          width: adjustedCheckMarkSize + Constants.CHECKBOX_PADDING,
        },
      ]}
      onPress={() => {
        setIsCheckMarkVisible(!isCheckMarkVisible);
        handlePress();
      }}
    >
      {isCheckMarkVisible && (
        <AntDesign name={"check"} size={adjustedCheckMarkSize} color={"#2e4459"} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#00aaef",
  },
});

export default CheckBox;
