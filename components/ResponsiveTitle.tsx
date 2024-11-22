// React imports
import React, { useState } from "react";
import { Dimensions, Text, StyleSheet, TextStyle } from "react-native";

// Utility function
import calculateSize from "@/utils/CalculateSize";

// Custom hook
import useDimensionsEffect from "@/hooks/useDimensions";

// Constants
import { Constants } from "@/constants";

interface ResponsiveTitleProps {
  title: string;
  size: number;
  style?: TextStyle | TextStyle[];
}

const ResponsiveTitle: React.FC<ResponsiveTitleProps> = ({ title, size, style }) => {
  const [fontSize, setFontSize] = useState<number>(
    calculateSize(Dimensions.get("window").width, size)
  );

  useDimensionsEffect(size, [
    [setFontSize, (width, size) => calculateSize(width, size), Constants.MIN_TITLE_SIZE_MEDIUM],
  ]);

  const textFontSize = Math.min(
    Math.max(fontSize, Constants.MIN_TITLE_SIZE_MEDIUM),
    Constants.MAX_TITLE_SIZE_MEDIUM
  );

  return (
    <Text style={[styles.text, style, { fontSize: textFontSize }]} numberOfLines={1}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    verticalAlign: "middle",
    fontFamily: "Poppins-Bold",
    color: "#2e4459",
    paddingVertical: 0,
    marginVertical: 0,
  },
});

export default ResponsiveTitle;
