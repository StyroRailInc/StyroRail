// React imports
import React, { useState } from "react";
import { Dimensions, TextInput, StyleSheet, TextStyle } from "react-native";

// Utility functions
import calculateSize from "@/utils/CalculateSize";

// Custom hooks
import useDimensionsEffect from "@/hooks/useDimensions";

// Constants
import { Constants } from "@/constants";

interface ResponsiveInputProps {
  title: string;
  size: number;
  input: string;
  inputStyle?: TextStyle | TextStyle[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const ResponsiveInput: React.FC<ResponsiveInputProps> = ({
  title,
  size,
  input,
  inputStyle,
  setInput,
}) => {
  const adjustedFontSize: number = calculateSize(Dimensions.get("window").width, size);

  const [fontSize, setFontSize] = useState<number>(
    Math.max(Constants.MIN_FONT_SIZE, adjustedFontSize)
  );

  useDimensionsEffect(size, [
    [setFontSize, (width, size) => calculateSize(width, size), Constants.MIN_FONT_SIZE],
  ]);

  const textFontSize: number =
    fontSize > Constants.MAX_FONT_SIZE ? Constants.MAX_FONT_SIZE : fontSize;

  return (
    <TextInput
      style={[
        styles.input,
        inputStyle,
        {
          fontSize: textFontSize,
          includeFontPadding: false,
          height: textFontSize * Constants.INPUT_HEIGHT_ADJUSTMENT_FACTOR,
        },
      ]}
      value={input}
      inputMode="text"
      placeholder={title}
      blurOnSubmit={false}
      onChangeText={(text) => setInput(text)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    minWidth: 0,
    minHeight: 0,
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    color: "#2e4459",
    fontFamily: "Poppins-Bold",
    paddingTop: 0,
    paddingBottom: 0,
    paddingVertical: 0,
    textAlignVertical: "center",
  },
});

export default ResponsiveInput;
