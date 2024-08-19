// React imports
import React, { useState } from "react";
import { Dimensions, Text, StyleSheet, TextStyle } from "react-native";

// Utility function
import calculateSize from "@/utils/CalculateSize";

// Custom hook
import useDimensionsEffect from "@/hooks/useDimensions";

// Constants
import { Constants } from "@/constants";

interface ResponsiveTextProps {
  title: string;
  size: number;
  header?: boolean;
  style?: TextStyle | TextStyle[];
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({ title, size, style, header }) => {
  const MIN_FONT_SIZE = header ? Constants.MIN_TITLE_SIZE : Constants.MIN_FONT_SIZE;
  const MAX_FONT_SIZE = header ? Constants.MAX_TITLE_SIZE : Constants.MAX_FONT_SIZE;

  const [fontSize, setFontSize] = useState<number>(
    calculateSize(Dimensions.get("window").width, size)
  );

  useDimensionsEffect(size, [
    [setFontSize, (width, size) => calculateSize(width, size), MIN_FONT_SIZE],
  ]);

  const textFontSize = Math.min(Math.max(fontSize, MIN_FONT_SIZE), MAX_FONT_SIZE);

  return (
    <Text style={[styles.text, style, { fontSize: textFontSize }]} numberOfLines={1}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    textAlignVertical: "center",
    fontFamily: "Poppins-Bold",
    color: "#2e4459",
    paddingVertical: 0,
    marginVertical: 0,
  },
});

export default ResponsiveText;
